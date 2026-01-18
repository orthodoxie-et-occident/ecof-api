/**
 * Format YYYY-MM-DD to {year, month, day}
 * @param {string} dateStr
 * @returns {{year:number,month:number,day:number}}
 */
export function formatISOToYMD(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number)
    return { year, month, day }
}

/**
 * Format {year, month, day} to YYYY-MM-DD
 * @param {{year:number, month:number, day:number}} date
 * @returns {string}
 */
export function formatYMDToISO({ year, month, day }) {
    const m = String(month).padStart(2, "0")
    const d = String(day).padStart(2, "0")
    return `${year}-${m}-${d}`
}

/**
 * Format Date to YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
export function formatDateToYMD(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
}

/**
 * Add or subtract days to YYYY-MM-DD date
 * @param {string} dateStr
 * @param {number} days
 * @returns {string}
 */
export function addDaysToISO(dateStr, days) {
    const { year, month, day } = formatISOToYMD(dateStr)
    const date = new Date(year, month - 1, day)
    date.setDate(date.getDate() + days)
    return formatYMDToISO({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    })
}

/**
 * Calculate difference in days between two ISO date strings
 * @param {string} dateStr1
 * @param {string} dateStr2
 * @returns {number}
 */
export function diffDays(dateStr1, dateStr2) {
    const { year: y1, month: m1, day: d1 } = formatISOToYMD(dateStr1)
    const { year: y2, month: m2, day: d2 } = formatISOToYMD(dateStr2)
    const date1 = new Date(y1, m1 - 1, d1)
    const date2 = new Date(y2, m2 - 1, d2)
    const diff = date2 - date1
    return Math.round(diff / (1000 * 60 * 60 * 24))
}
