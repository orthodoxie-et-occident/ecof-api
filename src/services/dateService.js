/**
 * Accept ISO YYYY-MM-DD date and return Easter date of the year in same format
 * @param {string} isoDateString
 * @returns {string}
 */
export function getEasterDate (isoDateString) {
  const year = parseInt(isoDateString.split('-')[0], 10)
  const n = year % 19
  const c = Math.floor(year / 100)
  const u = year % 100
  const s = Math.floor(c / 4)
  const t = c % 4
  const p = Math.floor((c + 8) / 25)
  const q = Math.floor((c - p + 1) / 3)
  const e = (19 * n + c - s - q + 15) % 30
  const b = Math.floor(u / 4)
  const d = u % 4
  const L = (2 * t + 2 * b - e - d + 32) % 7
  const h = Math.floor((n + 11 * e + 22 * L) / 451)
  const easterMonth = Math.floor((e + L - 7 * h + 114) / 31)
  const easterDay = ((e + L - 7 * h + 114) % 31) + 1
  const easterDate = new Date(Date.UTC(year, easterMonth - 1, easterDay))
  return easterDate.toISOString()
}
