import { store } from '../store.js'

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
