import { readings } from "./repository"
import { applyFrenchTypography } from "../../utils/typography"

export async function getReading(id) {
    const reading = await readings.getScriptureReading(id)
    if (!reading) return null

    const result = reading.map((row) => ({
        ...row,
        book_txt: applyFrenchTypography(row.book_txt ?? ""),
        reading: applyFrenchTypography(row.reading ?? ""),
    }))

    return result
}
