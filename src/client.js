import * as sapper from '../__sapper__/client.js'
import './routes/_utils/serviceWorkerClient.js'
import './routes/_utils/historyEvents.js'
import './routes/_utils/forceOnline.js'

sapper.start({ target: document.querySelector('#sapper') })
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
