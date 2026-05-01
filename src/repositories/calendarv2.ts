import { db } from "../utils/database"

type SynaxarRow = { principal: number; prefixe: string; saint: string; id: number }
type TemporalRow = { id: number; block: string; block_title: string; book_txt: string }
type TemporalBlock = { block_title: string; readings: { id: number; book_txt: string }[] }

export const calendar = {
    async getSynaxar(month: number, day: number) {
        const rows = await db`
            SELECT principal, prefixe, saint, id
            FROM synaxaire
            WHERE mois = ${month} AND jour = ${day}
              AND principal IN (0, 1) AND calendrier != 0
        `
        return rows as SynaxarRow[]
    },

    async getTemporalReadings(temporalIndex: number) {
        const rows = await db`
            SELECT readings.id, readings.block, readings.book_txt, blocks.block_title
            FROM readings 
            JOIN blocks ON readings.block = block_id
            WHERE dayIndex = ${temporalIndex}
            ORDER BY readings.id ASC
        `

        const grouped = (rows as TemporalRow[]).reduce((acc: Record<string, TemporalBlock & { _minId: number }>, row: TemporalRow) => {
            const key = row.block
            if (!acc[key]) {
                acc[key] = { block_title: row.block_title, readings: [], _minId: row.id }
            }
            acc[key].readings.push({ id: row.id, book_txt: row.book_txt })
            return acc
        }, {})

        return Object.values(grouped)
            .sort((a, b) => a._minId - b._minId)
            .map(({ _minId, ...block }) => block)
    },

    async getSanctoralReadings(sanctoralIndex: number) {
        const rows = await db`
            SELECT readings.id, readings.block, readings.book_txt, blocks.block_title
            FROM readings 
            JOIN blocks ON readings.block = block_id
            WHERE dayIndex = ${sanctoralIndex}
            ORDER BY readings.id ASC
        `

        const grouped = (rows as TemporalRow[]).reduce((acc: Record<string, TemporalBlock & { _minId: number }>, row: TemporalRow) => {
            const key = row.block
            if (!acc[key]) {
                acc[key] = { block_title: row.block_title, readings: [], _minId: row.id }
            }
            acc[key].readings.push({ id: row.id, book_txt: row.book_txt })
            return acc
        }, {})

        return Object.values(grouped)
            .sort((a, b) => a._minId - b._minId)
            .map(({ _minId, ...block }) => block)
    },
}
