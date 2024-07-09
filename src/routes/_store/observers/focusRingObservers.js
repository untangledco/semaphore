export function focusRingObservers (store) {
  if (!process.browser) {
    return
  }

  const style = document.getElementById('theFocusVisibleStyle')

  store.observe('alwaysShowFocusRing', alwaysShowFocusRing => {
    style.setAttribute('media', alwaysShowFocusRing ? 'only x' : 'all') // disable or enable the style
  })
}
