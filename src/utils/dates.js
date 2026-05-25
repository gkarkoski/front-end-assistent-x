export function toApiDateTime(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  const pad = (n) => String(n).padStart(2, '0')
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const h = pad(date.getHours())
  const min = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  return `${y}-${m}-${d}T${h}:${min}:${s}-03:00`
}

export function toDatetimeLocalValue(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function formatDisplayDate(isoString) {
  if (!isoString) return '—'
  return new Date(isoString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function isInDateRange(isoString, startDate, endDate) {
  if (!isoString) return false
  const time = new Date(isoString).getTime()
  if (startDate) {
    const start = new Date(startDate + 'T00:00:00').getTime()
    if (time < start) return false
  }
  if (endDate) {
    const end = new Date(endDate + 'T23:59:59').getTime()
    if (time > end) return false
  }
  return true
}
