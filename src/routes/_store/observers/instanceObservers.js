import { updateInstanceInfo, updateVerifyCredentialsForInstance } from '../../_actions/instances.js'
import { setupListsForInstance } from '../../_actions/lists.js'
import { updatePushSubscriptionForInstance } from '../../_actions/pushSubscription.js'
import { setupCustomEmojiForInstance } from '../../_actions/emoji.js'
import { scheduleIdleTask } from '../../_utils/scheduleIdleTask.js'
import { store } from '../store.js'
import { updateFollowRequestCountIfLockedAccount } from '../../_actions/followRequests.js'
import { setupFiltersForInstance } from '../../_actions/filters.js'

async function refreshInstance (store, name) {
  if (store.get().currentInstance !== name) {
    return
  }
  setupCustomEmojiForInstance(name)
  setupListsForInstance(name)
  setupFiltersForInstance(name)
  updatePushSubscriptionForInstance(name)
  updateInstanceInfo(name)
  updateVerifyCredentialsForInstance(name).then(() => {
      // Once we have the verifyCredentials (so we know if the account is locked),
      // lazily update the follow requests
      scheduleIdleTask(() => updateFollowRequestCountIfLockedAccount(name))
    })

  await refreshInstance(name)

  if (store.get().currentInstance !== name) {
    return
  }

  const { currentInstanceInfo } = store.get()
}

export function instanceObservers () {
  store.observe('currentInstance', async (currentInstance) => {
    if (!process.browser) {
      return
    }
    if (!currentInstance) {
      return
    }

    scheduleIdleTask(() => refreshInstance(store, currentInstance))
  })
}
