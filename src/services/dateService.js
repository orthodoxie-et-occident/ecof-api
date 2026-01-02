import { formatISOToYMD, formatYMDToISO, addDaysToISO, diffDays } from '../utils/dates.js'

/**
 * Get ISO formatted Easter date (YYYY-MM-DD) for a given year
 * @param {number} year
 * @returns {string}
 */
function getEasterDate(year) {
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
    const month = Math.floor((e + L - 7 * h + 114) / 31)
    const day = ((e + L - 7 * h + 114) % 31) + 1
    return formatYMDToISO({
        year,
        month,
        day
    })
}

/**
 * Get temporal index for a given YYYY-MM-DD date
 * @param {string} dateStr
 * @returns {number}
 */
export function getTemporalIndex(dateStr) {
    const { year } = formatISOToYMD(dateStr)
    const easter = getEasterDate(year)
    const septuagesimaSunday = addDaysToISO(easter, -63)
    const christmas = formatYMDToISO({ year, month: 12, day: 25 })
    const { year: cYear, month: cMonth, day: cDay } = formatISOToYMD(christmas)
    const christmasDate = new Date(cYear, cMonth - 1, cDay)
    const christmasDayOfWeek = christmasDate.getDay()
    const daysToSubtract = christmasDayOfWeek + 49
    const secondLastSundayAfterPentecost = addDaysToISO(christmas, -daysToSubtract)
    const saintSylvester = formatYMDToISO({ year, month: 12, day: 31 })
    let seasonIndex = 0
    let dayIndex = 0
    if (dateStr > secondLastSundayAfterPentecost && dateStr <= saintSylvester) {
        seasonIndex = 1000
        dayIndex = diffDays(secondLastSundayAfterPentecost, dateStr)
    } else if (dateStr >= septuagesimaSunday && dateStr <= secondLastSundayAfterPentecost) {
        seasonIndex = 2000
        dayIndex = diffDays(septuagesimaSunday, dateStr) + 1
    } else if (dateStr < septuagesimaSunday) {
        seasonIndex = 3000
        dayIndex = ''
    }
    return +(seasonIndex + dayIndex)
}

/**
 * Get sanctoral index for a given YYYY-MM-DD date
 * @param {string} dateStr
 * @returns {number}
 */
export function getSanctoralIndex(dateStr) {
    const { month, day } = formatISOToYMD(dateStr)
    return month * 100 + day
}
