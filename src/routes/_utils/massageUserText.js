import { massageStatusPlainText } from './massageStatusPlainText.js'

export function massageUserText (text, emojis, $autoplayGifs) {
  text = text || ''
  text = massageStatusPlainText(text)
  return text
}
