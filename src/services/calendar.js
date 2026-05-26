import { formatISOToYMD, formatYMDToISO, addDaysToISO, diffDays } from "../utils/dates.js"
import { calendar } from "../repositories/calendar.js"

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
        day,
    })
}

function getTemporalIndex(dateStr) {
    // Calculation for current year
    const { year } = formatISOToYMD(dateStr)
    const easter = getEasterDate(year)
    const septuagesimaSunday = addDaysToISO(easter, -63)
    const christmas = formatYMDToISO({ year, month: 12, day: 25 })
    const { year: cYear, month: cMonth, day: cDay } = formatISOToYMD(christmas)
    const christmasDate = new Date(cYear, cMonth - 1, cDay)
    const christmasDayOfWeek = christmasDate.getDay()
    const secondLastSundayAfterPentecost = addDaysToISO(christmas, -(christmasDayOfWeek + 49))
    const sundayInOctaveOfChristmas = addDaysToISO(christmas, christmasDayOfWeek === 0 ? 0 : 7 - christmasDayOfWeek)
    // Calculation for year - 1
    const previousChristmas = formatYMDToISO({ year: year - 1, month: 12, day: 25 })
    const { year: pcYear, month: pcMonth, day: pcDay } = formatISOToYMD(previousChristmas)
    const previousChristmasDate = new Date(pcYear, pcMonth - 1, pcDay)
    const previousChristmasDayOfWeek = previousChristmasDate.getDay()
    const previousSundayInOctaveOfChristmas = addDaysToISO(previousChristmas, previousChristmasDayOfWeek === 0 ? 7 : 7 - previousChristmasDayOfWeek)
    let seasonIndex = 0
    let dayIndex = 0
    if (dateStr > secondLastSundayAfterPentecost && dateStr <= christmas) {
        seasonIndex = 1000
        dayIndex = diffDays(secondLastSundayAfterPentecost, dateStr)
    } else if (dateStr >= sundayInOctaveOfChristmas) {
        seasonIndex = 1500
        dayIndex = diffDays(sundayInOctaveOfChristmas, dateStr) + 1
    } else if (dateStr < septuagesimaSunday) {
        seasonIndex = 1500
        dayIndex = diffDays(previousSundayInOctaveOfChristmas, dateStr) + 1
    } else if (dateStr >= septuagesimaSunday && dateStr <= secondLastSundayAfterPentecost) {
        seasonIndex = 2000
        dayIndex = diffDays(septuagesimaSunday, dateStr) + 1
    }
    return +(seasonIndex + dayIndex)
}

function getSanctoralIndex(dateStr) {
    const { month, day } = formatISOToYMD(dateStr)
    return 10000 + month * 100 + day
}

export async function getCalendarInfo(date) {
    const temporalIndex = getTemporalIndex(date)
    const sanctoralIndex = getSanctoralIndex(date)
    const { month, day } = formatISOToYMD(date)

    const [synaxar, readingsTemp, readingsSanct, temporalEvents] = await Promise.all([
        calendar.getSynaxar(month, day),
        calendar.getTemporalReadings(temporalIndex),
        calendar.getSanctoralReadings(sanctoralIndex),
        calendar.getTemporalEvents(temporalIndex),
    ])

    return {
        synaxar: [
            ...synaxar,
            ...temporalEvents.map((e) => ({
                principal: 0,
                prefixe: e.text,
                saint: "",
                id: 0,
            })),
        ],
        readings: {
            temporal: readingsTemp,
            sanctoral: readingsSanct,
        },
    }
}
