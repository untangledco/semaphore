import { get } from '../_utils/lodash-lite.js'
import { scheduleIdleTask } from '../_utils/scheduleIdleTask.js'
import { statusHtmlToPlainText } from '../_utils/statusHtmlToPlainText.js'

function getActualStatus (statusOrNotification) {
  return get(statusOrNotification, ['status']) ||
    get(statusOrNotification, ['notification', 'status'])
}

async function calculatePlainTextContent (statusOrNotification) {
  const status = getActualStatus(statusOrNotification)
  if (!status) {
    return
  }
  const originalStatus = status.reblog ? status.reblog : status
  const content = originalStatus.content || ''
  const mentions = originalStatus.mentions || []
  // Calculating the plaintext from the HTML is a non-trivial operation, so we might
  // as well do it in advance, while blurhash is being decoded on the worker thread.
  await new Promise(resolve => {
    scheduleIdleTask(() => {
      originalStatus.plainTextContent = statusHtmlToPlainText(content, mentions)
      resolve()
    })
  })
}

// Do stuff that we need to do when the status or notification is fetched from the database,
// like calculating the blurhash or calculating the plain text content
export async function rehydrateStatusOrNotification (statusOrNotification) {
  await Promise.all([
    calculatePlainTextContent(statusOrNotification)
  ])
}
