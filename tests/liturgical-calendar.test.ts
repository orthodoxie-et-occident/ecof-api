import { describe, expect, test } from "bun:test"
import { getLiturgicalDates } from "../src/features/liturgical-calendar/liturgical-calendar.utils"

const cases = [
  {
    year: 2023,
    easter: "2023-04-09",
    penultimateSundayAfterPentecost: "2023-11-05",
    sundayInTheOctaveOfChristmas: "2023-12-31",
    emberSummerSaturday: "2023-12-31",
    emberAutumnSaturday: "2023-12-31",
  },
  {
    year: 2024,
    easter: "2024-03-31",
    penultimateSundayAfterPentecost: "2024-11-03",
    sundayInTheOctaveOfChristmas: "2024-12-29",
    emberSummerSaturday: "2023-12-31",
    emberAutumnSaturday: "2023-12-31",
  },
  {
    year: 2025,
    easter: "2025-04-20",
    penultimateSundayAfterPentecost: "2025-11-02",
    sundayInTheOctaveOfChristmas: "2025-12-28",
    emberSummerSaturday: "2023-12-31",
    emberAutumnSaturday: "2023-12-31",
  },
  {
    year: 2026,
    easter: "2026-04-05",
    penultimateSundayAfterPentecost: "2026-11-01",
    sundayInTheOctaveOfChristmas: "2026-12-27",
    emberSummerSaturday: "2026-06-20",
    emberAutumnSaturday: "2026-09-19",
  },
]

describe("getLiturgicalDates", () => {
  for (const { year, ...expected } of cases) {
    describe(year, () => {
      const actual = getLiturgicalDates(year)
      for (const [key, value] of Object.entries(expected)) {
        test(key, () => {
          expect(actual[key as keyof typeof actual].toString()).toBe(value)
        })
      }
    })
  }
})
