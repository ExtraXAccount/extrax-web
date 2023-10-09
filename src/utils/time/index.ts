import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default function formatDatetime(time: dayjs.Dayjs) {
  if (!time) {
    return ''
  }
  return time.format('YYYY/MM/DD HH:mm a')
  // return time.format('MM/DD/YYYY HH:mm Z a');
}

export function toUTCString(time: dayjs.Dayjs) {
  if (!time) {
    return ''
  }
  return new Date(time.valueOf()).toUTCString()
}
