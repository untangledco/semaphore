import * as sapper from '../__sapper__/client.js'
import './routes/_utils/serviceWorkerClient.js'
import './routes/_utils/historyEvents.js'
import './routes/_utils/forceOnline.js'
import { mark, stop } from './routes/_utils/marks.js'

mark('sapperStart')
sapper.start({ target: document.querySelector('#sapper') })
stop('sapperStart')

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
