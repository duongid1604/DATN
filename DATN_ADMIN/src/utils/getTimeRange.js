import { format } from 'date-fns'
import intervalToDuration from 'date-fns/intervalToDuration'
import milliseconds from 'date-fns/milliseconds'

export const getTimeRangeMilliseconds = (expiredDate) => {
  const timeInterval = intervalToDuration({
    start: Date.now(),
    end: new Date(expiredDate),
  })
  return milliseconds(timeInterval)
}
export const getMonthName = (monthNumber) => {
  const date = new Date()
  date.setMonth(monthNumber - 1)

  return date.toLocaleString('en-US', { month: 'long' })
}
