// LITURGICAL CALENDAR UTILITY FUNCTIONS
// getTemporalIndex(date)
// getSanctoralIndex(date)
// getSpecificIndex(date)
// getLiturgicalDates(year)
// getEasterDate(year)

/**
 * Return temporal index for a given date depending of liturgical season
 */
export function getTemporalIndex(dateStr: string): number {
  const date = Temporal.PlainDate.from(dateStr)
  const { year } = date
  const {
    septuagesimaSunday,
    christmas,
    penultimateSundayAfterPentecost,
    sundayInTheOctaveOfChristmas,
    previousSundayInTheOctaveOfChristmas,
  } = getLiturgicalDates(year)
  let seasonIndex = 0
  let dayIndex = 0
  if (
    Temporal.PlainDate.compare(date, penultimateSundayAfterPentecost) > 0 &&
    Temporal.PlainDate.compare(date, christmas) <= 0
  ) {
    seasonIndex = 1000
    dayIndex = penultimateSundayAfterPentecost.until(date, {
      largestUnit: "days",
    }).days
  } else if (
    Temporal.PlainDate.compare(date, sundayInTheOctaveOfChristmas) >= 0
  ) {
    seasonIndex = 1500
    dayIndex =
      sundayInTheOctaveOfChristmas.until(date, {
        largestUnit: "days",
      }).days + 1
  } else if (Temporal.PlainDate.compare(date, septuagesimaSunday) < 0) {
    seasonIndex = 1500
    dayIndex =
      previousSundayInTheOctaveOfChristmas.until(date, {
        largestUnit: "days",
      }).days + 1
  } else if (
    Temporal.PlainDate.compare(date, septuagesimaSunday) >= 0 &&
    Temporal.PlainDate.compare(date, penultimateSundayAfterPentecost) <= 0
  ) {
    seasonIndex = 2000
    dayIndex =
      septuagesimaSunday.until(date, {
        largestUnit: "days",
      }).days + 1
  }
  return seasonIndex + dayIndex
}

/**
 * Return sanctoral index for a given date
 */
export function getSanctoralIndex(month: number, day: number) {
  return 10000 + month * 100 + day
}

/**
 * Return specific index for a given date
 */
export function getSpecificIndex(dateStr: string): number {
  const date = Temporal.PlainDate.from(dateStr)
  const d = getLiturgicalDates(date.year)
  // Quatre-temps
  if (date.equals(d.emberSummerWednesday)) return 3001
  if (date.equals(d.emberSummerFriday)) return 3002
  if (date.equals(d.emberSummerSaturday)) return 3003
  if (date.equals(d.emberAutumnWednesday)) return 3004
  if (date.equals(d.emberAutumnFriday)) return 3005
  if (date.equals(d.emberAutumnSaturday)) return 3006
  // Dernier dimanche après Pentecôte
  if (
    date.equals(d.easter.add({ weeks: 28 })) &&
    date.equals(d.penultimateSundayAfterPentecost.add({ weeks: 1 }))
  )
    return 3021
  if (
    date.equals(d.easter.add({ weeks: 29 })) &&
    date.equals(d.penultimateSundayAfterPentecost.add({ weeks: 1 }))
  )
    return 3022
  if (
    date.equals(d.easter.add({ weeks: 30 })) &&
    date.equals(d.penultimateSundayAfterPentecost.add({ weeks: 1 }))
  )
    return 3023
  if (
    date.equals(d.easter.add({ weeks: 31 })) &&
    date.equals(d.penultimateSundayAfterPentecost.add({ weeks: 1 }))
  )
    return 3024
  if (
    date.equals(d.easter.add({ weeks: 32 })) &&
    date.equals(d.penultimateSundayAfterPentecost.add({ weeks: 1 }))
  )
    return 3025
  if (
    date.equals(d.easter.add({ weeks: 33 })) &&
    date.equals(d.penultimateSundayAfterPentecost.add({ weeks: 1 }))
  )
    return 3026
  return 0
}

/**
 * Return all liturgical key dates for a given year
 */
export function getLiturgicalDates(year: number) {
  // Easter Sunday
  const easter = getEasterDate(year)
  // Septuagesima Sunday 9 weeks before Easter Sunday
  const septuagesimaSunday = easter.subtract({
    days: 63,
  })

  // Christmas Day
  const christmas = Temporal.PlainDate.from({
    year,
    month: 12,
    day: 25,
  })

  // Penultimate Sunday after Pentecost
  const penultimateSundayAfterPentecost = christmas.subtract({
    days: christmas.dayOfWeek + 49,
  })

  // Sunday in the Octave of Christmas, or Christmas Day if it falls on a Sunday
  const sundayInTheOctaveOfChristmas = christmas.add({
    days: christmas.dayOfWeek === 7 ? 0 : 7 - christmas.dayOfWeek,
  })

  // Christmas Day of the previous year
  const previousChristmas = Temporal.PlainDate.from({
    year: year - 1,
    month: 12,
    day: 25,
  })

  // Sunday in the Octave of Christmas, or Christmas Day if it falls on a Sunday, for the previous year
  const previousSundayInTheOctaveOfChristmas = previousChristmas.add({
    days:
      previousChristmas.dayOfWeek === 7 ? 0 : 7 - previousChristmas.dayOfWeek,
  })

  // Summer Ember Days: Wed, Fri, Sat preceding the summer solstice (June 21)
  // Wednesday = last Wednesday strictly before June 21
  const summerSolstice = Temporal.PlainDate.from({ year, month: 6, day: 21 })
  const summerWednesday = summerSolstice.subtract({
    days: (summerSolstice.dayOfWeek - 3 + 7) % 7 || 7,
  })

  // Autumn Ember Days: Wed, Fri, Sat following the Exaltation of the Cross (Sept 14)
  // Wednesday = first Wednesday strictly after September 14
  const holyCross = Temporal.PlainDate.from({ year, month: 9, day: 14 })
  const autumnWednesday = holyCross.add({
    days: (3 - holyCross.dayOfWeek + 7) % 7 || 7,
  })

  return {
    easter,
    septuagesimaSunday,
    christmas,
    penultimateSundayAfterPentecost,
    sundayInTheOctaveOfChristmas,
    previousSundayInTheOctaveOfChristmas,
    emberSummerWednesday: summerWednesday,
    emberSummerFriday: summerWednesday.add({ days: 2 }),
    emberSummerSaturday: summerWednesday.add({ days: 3 }),
    emberAutumnWednesday: autumnWednesday,
    emberAutumnFriday: autumnWednesday.add({ days: 2 }),
    emberAutumnSaturday: autumnWednesday.add({ days: 3 }),
  }
}

/**
 * Return Easter date for a given year
 */
function getEasterDate(year: number): Temporal.PlainDate {
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
  return Temporal.PlainDate.from({
    year,
    month,
    day,
  })
}
