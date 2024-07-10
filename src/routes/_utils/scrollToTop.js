import { getScrollContainer } from './scrollContainer.js'

export function scrollToTop (smooth) {
  const scroller = getScrollContainer()
  const { scrollTop } = scroller
  if (scrollTop === 0) {
    return false
  }
  scroller.scrollTop = 0
  return true
}
