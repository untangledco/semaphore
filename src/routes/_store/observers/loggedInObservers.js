import { instanceObservers } from './instanceObservers.js'
import { timelineObservers } from './timelineObservers.js'
import { notificationObservers } from './notificationObservers.js'
import { autosuggestObservers } from './autosuggestObservers.js'
import { notificationPermissionObservers } from './notificationPermissionObservers.js'
import { cleanup } from './cleanup.js'
import { wordFilterObservers } from './wordFilterObservers.js'
import { showComposeDialogObservers } from './showComposeDialogObservers.js'
import { badgeObservers } from './badgeObservers.js'
import { centerNavObservers } from './centerNavObservers.js'

// These observers can be lazy-loaded when the user is actually logged in.
// Prevents circular dependencies and reduces the size of main.js
export function loggedInObservers () {
  instanceObservers()
  timelineObservers()
  wordFilterObservers()
  notificationObservers()
  autosuggestObservers()
  notificationPermissionObservers()
  centerNavObservers()
  showComposeDialogObservers()
  badgeObservers()
  cleanup()
}
