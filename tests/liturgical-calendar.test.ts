import { describe, expect, test } from "bun:test"
import { getEasterDate } from "../src/features/liturgical-calendar/liturgical-calendar.utils"

describe("getEasterDate", () => {
  test("returns Easter Sunday for 2022", () => {
    expect(getEasterDate(2021)).toEqual(Temporal.PlainDate.from("2021-04-04"))
  })
  test("returns Easter Sunday for 2023", () => {
    expect(getEasterDate(2023)).toEqual(Temporal.PlainDate.from("2023-04-09"))
  })
  test("returns Easter Sunday for 2024", () => {
    expect(getEasterDate(2024)).toEqual(Temporal.PlainDate.from("2024-03-31"))
  })
  test("returns Easter Sunday for 2025", () => {
    expect(getEasterDate(2025)).toEqual(Temporal.PlainDate.from("2025-04-20"))
  })
  test("returns Easter Sunday for 2026", () => {
    expect(getEasterDate(2026)).toEqual(Temporal.PlainDate.from("2026-04-05"))
  })
})
