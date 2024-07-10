import interpret from 'format-message-interpret'
import { LOCALE } from '../_static/intl.js'

function doFormatIntl (ast, values) {
  return interpret(ast, LOCALE)(values).trim().replace(/\s+/g, ' ')
}

export function formatIntl (ast, values) {
  if (process.env.NODE_ENV !== 'production') {
    // useful error debugging for dev mode
    if (typeof ast === 'string') {
      throw new Error('bad ast: ' + ast)
    }
    try {
      return doFormatIntl(ast, values)
    } catch (err) {
      console.error(err)
      throw new Error('bad ast or values : ' + ast + ' ' + values)
    }
  }
  return doFormatIntl(ast, values)
}
