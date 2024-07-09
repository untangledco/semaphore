import { DB_VERSION_CURRENT } from './constants.js'
import { addKnownInstance, deleteKnownInstance } from './knownInstances.js'
import { migrations } from './migrations.js'
import { clearAllCaches } from './cache.js'
import { lifecycle } from '../_utils/lifecycle.js'
import { scheduleIdleTask } from '../_utils/scheduleIdleTask.js'
import { del } from '../_thirdparty/idb-keyval/idb-keyval.js'

const openReqs = {}
const databaseCache = {}

function createDatabase (instanceName) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(instanceName, DB_VERSION_CURRENT.version)
    openReqs[instanceName] = req
    req.onerror = reject
    req.onblocked = () => {
      console.error('idb blocked')
    }
    req.onupgradeneeded = (e) => {
      const db = req.result
      const tx = e.currentTarget.transaction

      const migrationsToDo = migrations.filter(({ version }) => e.oldVersion < version)

      function doNextMigration () {
        if (!migrationsToDo.length) {
          return
        }
        const { migration } = migrationsToDo.shift()
        migration(db, tx, doNextMigration)
      }
      doNextMigration()
    }
    req.onsuccess = () => resolve(req.result)
  })
}

export async function getDatabase (instanceName) {
  if (!instanceName) {
    throw new Error('instanceName is undefined in getDatabase()')
  }
  if (!databaseCache[instanceName]) {
    databaseCache[instanceName] = await createDatabase(instanceName)
    await addKnownInstance(instanceName)
  }
  return databaseCache[instanceName]
}

export async function dbPromise (db, storeName, readOnlyOrReadWrite, cb) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, readOnlyOrReadWrite)
    const store = typeof storeName === 'string'
      ? tx.objectStore(storeName)
      : storeName.map(name => tx.objectStore(name))
    let res
    cb(store, (result) => {
      res = result
    })

    tx.oncomplete = () => resolve(res)
    tx.onerror = () => reject(tx.error)
  })
}

export function deleteDatabase (instanceName) {
  return new Promise((resolve, reject) => {
    // close any open requests
    const openReq = openReqs[instanceName]
    if (openReq && openReq.result) {
      openReq.result.close()
    }
    delete openReqs[instanceName]
    delete databaseCache[instanceName]
    const req = indexedDB.deleteDatabase(instanceName)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
    req.onblocked = () => console.error(`database ${instanceName} blocked`)
  }).then(() => deleteKnownInstance(instanceName))
    .then(() => clearAllCaches(instanceName))
}

export function closeDatabase (instanceName) {
  // close any open requests
  const openReq = openReqs[instanceName]
  if (openReq && openReq.result) {
    openReq.result.close()
  }
  delete openReqs[instanceName]
  delete databaseCache[instanceName]
  clearAllCaches(instanceName)
}

if (process.browser) {
  lifecycle.addEventListener('statechange', event => {
    if (event.newState === 'frozen') { // page is frozen, close IDB connections
      Object.keys(openReqs).forEach(instanceName => {
        closeDatabase(instanceName)
        console.log('closed instance DBs')
      })
    }
  })
}
