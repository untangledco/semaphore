import { instanceObservers } from './instanceObservers.js'
import { notificationObservers } from './notificationObservers.js'
import { autosuggestObservers } from './autosuggestObservers.js'
import { notificationPermissionObservers } from './notificationPermissionObservers.js'
import { cleanup } from './cleanup.js'
import { wordFilterObservers } from './wordFilterObservers.js'
import { showComposeDialogObservers } from './showComposeDialogObservers.js'
import { badgeObservers } from './badgeObservers.js'

// These observers can be lazy-loaded when the user is actually logged in.
// Prevents circular dependencies and reduces the size of main.js
export function loggedInObservers () {
  instanceObservers()
  wordFilterObservers()
  notificationObservers()
  autosuggestObservers()
  notificationPermissionObservers()
  showComposeDialogObservers()
  badgeObservers()
  cleanup()
}
