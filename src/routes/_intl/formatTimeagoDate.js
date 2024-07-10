import { format } from '../_thirdparty/timeago/timeago.js'

// Format a date in the past
export function formatTimeagoDate (date, now) {
  if (typeof date !== 'number') { // means "never" in Misskey
    return 'intl.never'
  }
  // use Math.min() to avoid things like "in 10 seconds" when the timestamps are slightly off
  return format(Math.min(0, date - now))
}

// Format a date in the future
export function formatTimeagoFutureDate (date, now) {
  if (typeof date !== 'number') { // means "never" in Misskey
    return 'intl.never'
  }
  // use Math.max() for same reason as above
  return format(Math.max(0, date - now))
}
