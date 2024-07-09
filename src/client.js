import * as sapper from '../__sapper__/client.js'
import './routes/_utils/serviceWorkerClient.js'
import './routes/_utils/historyEvents.js'
import './routes/_utils/loadingMask.js'
import './routes/_utils/forceOnline.js'
import { mark, stop } from './routes/_utils/marks.js'
import { loadPolyfills } from './routes/_utils/polyfills/loadPolyfills.js'

loadPolyfills().then(() => {
  mark('sapperStart')
  sapper.start({ target: document.querySelector('#sapper') })
  stop('sapperStart')
})

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
