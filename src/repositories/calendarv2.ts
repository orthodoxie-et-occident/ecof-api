import { db } from "../utils/database"

type SynaxarRow = { principal: number; prefixe: string; saint: string; id: number }
type TemporalRow = { id: number; block: string; block_title: string; book_txt: string }
type TemporalBlock = { block_title: string; readings: { id: number; book_txt: string }[] }
type SanctoralRow = { id: number; book_txt: string }

export const calendar = {
    async getSynaxar(month: number, day: number) {
        const rows = await db`
            SELECT synaxaire.principal, synaxaire.prefixe, synaxaire.saint, 
                   vies.id
            FROM synaxaire
            JOIN vies ON synaxaire.vies_id = vies.id
            WHERE mois = ${month} AND jour = ${day} 
              AND principal IN (0, 1) AND calendrier != 0
        `
        return rows as SynaxarRow[]
    },

    async getTemporalReadings(temporalIndex: number) {
        const rows = await db`
            SELECT temporal.id, temporal.block, temporal.book_txt, temporal_blocks.block_title
            FROM temporal 
            JOIN temporal_blocks ON temporal.block = block_id
            WHERE temporalIndex = ${temporalIndex}
            ORDER BY temporal.id ASC
        `

        const grouped = (rows as TemporalRow[]).reduce((acc: Record<string, TemporalBlock>, row: TemporalRow) => {
            const key = row.block
            if (!acc[key]) {
                acc[key] = { block_title: row.block_title, readings: [] }
            }
            acc[key].readings.push({ id: row.id, book_txt: row.book_txt })
            return acc
        }, {})

        return Object.values(grouped)
    },

    async getSanctoralReadings(sanctoralIndex: number) {
        const rows = await db`
            SELECT sanctoral.id, sanctoral.book_txt
            FROM sanctoral 
            JOIN sanctoral_blocks ON sanctoral.block = block_id
            WHERE sanctoralIndex = ${sanctoralIndex}
            ORDER BY sanctoral.id ASC
        `
        return rows as SanctoralRow[]
    },
}
