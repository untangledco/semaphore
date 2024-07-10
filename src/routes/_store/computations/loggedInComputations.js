// like loggedInObservers.js, these can be lazy-loaded once the user is actually logged in
import { timelineComputations } from './timelineComputations.js'
import { autosuggestComputations } from './autosuggestComputations.js'
import { store } from '../store.js'
import { wordFilterComputations } from './wordFilterComputations.js'
import { badgeComputations } from './badgeComputations.js'
import { timelineFilterComputations } from './timelineFilterComputations.js'

export function loggedInComputations () {
  wordFilterComputations(store)
  timelineComputations(store)
  timelineFilterComputations(store)
  badgeComputations(store)
  autosuggestComputations(store)
}
