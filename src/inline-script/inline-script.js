
// For perf reasons, this script is run inline to quickly set certain styles.
// To allow CSP to work correctly, we also calculate a sha256 hash during
// the build process and write it to checksum.js.

import { basename } from '../routes/_api/utils.js'
import { onUserIsLoggedOut } from '../routes/_actions/onUserIsLoggedOut.js'
import { storeLite } from '../routes/_store/storeLite.js'

window.__themeColors = process.env.THEME_COLORS

const {
  currentInstance,
  bottomNav,
  pushSubscription,
  loggedInInstancesInOrder,
  centerNav
} = storeLite.get()

if (currentInstance) {
  // Do preconnect if we're logged in, so we can connect faster to the other origin.
  const link = document.createElement('link')
  link.setAttribute('rel', 'preconnect')
  link.setAttribute('href', basename(currentInstance))
  link.setAttribute('crossorigin', 'anonymous')
  document.head.appendChild(link)
}

if (!currentInstance) {
  // if not logged in, show all these 'hidden-from-ssr' elements
  onUserIsLoggedOut()
}

if (disableCustomScrollbars) {
  document.getElementById('theScrollbarStyle')
    .setAttribute('media', 'only x') // disables the style
}

if (bottomNav) {
  document.getElementById('theBottomNavStyle')
    .setAttribute('media', 'all') // enables the style
}

if (centerNav) {
  document.getElementById('theCenterNavStyle')
    .setAttribute('media', 'all') // enables the style
}

if (pushSubscription) {
  // Fix a bug in Pinafore <=v1.9.0 if we only have one instance we're logged in to
  // (https://github.com/nolanlawson/pinafore/issues/1274)
  if (loggedInInstancesInOrder && loggedInInstancesInOrder.length === 1) {
    storeLite.set({
      pushSubscriptions: {
        [currentInstance]: pushSubscription
      }
    })
  }
  storeLite.set({
    pushSubscription: null
  })
}
