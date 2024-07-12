import { store } from '../store.js'
import { isChromePre87 } from '../../_utils/userAgent/isChromePre87.js'

export function badgeObservers () {
  if (!process.browser) {
    return
  }
  store.observe('badgeNumber', badgeNumber => {
    if (badgeNumber) {
      navigator.setAppBadge(badgeNumber)
    } else {
      navigator.clearAppBadge()
    }
  })
}
