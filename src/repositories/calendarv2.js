import { db } from "../utils/database"

export const calendar = {
    async getSynaxar(month, day) {
        const rows = await db`
      SELECT principal, prefixe, saint, id
      FROM synaxaire
      WHERE mois = ${month} AND jour = ${day}
        AND principal IN (0, 1) AND calendrier != 0
    `

        return rows || []
    },

    async getTemporalReadings(temporalIndex) {
        const rows = await db`
      SELECT readings.id, readings.block, readings.book_txt, blocks.block_title
      FROM readings 
      JOIN blocks ON readings.block = block_id
      WHERE dayIndex = ${temporalIndex}
      ORDER BY readings.id ASC
    `

        const grouped = rows.reduce((acc, row) => {
            const key = row.block

            if (!acc[key]) {
                acc[key] = {
                    block_title: row.block_title,
                    readings: [],
                    _minId: row.id,
                }
            }

            acc[key].readings.push({
                id: row.id,
                book_txt: row.book_txt,
            })

            return acc
        }, {})

        return Object.values(grouped)
            .sort((a, b) => a._minId - b._minId)
            .map(({ _minId, ...block }) => block)
    },

    async getSanctoralReadings(sanctoralIndex) {
        const rows = await db`
      SELECT readings.id, readings.block, readings.book_txt, blocks.block_title
      FROM readings 
      JOIN blocks ON readings.block = block_id
      WHERE dayIndex = ${sanctoralIndex}
      ORDER BY readings.id ASC
    `

        const grouped = rows.reduce((acc, row) => {
            const key = row.block

            if (!acc[key]) {
                acc[key] = {
                    block_title: row.block_title,
                    readings: [],
                    _minId: row.id,
                }
            }

            acc[key].readings.push({
                id: row.id,
                book_txt: row.book_txt,
            })

            return acc
        }, {})

        return Object.values(grouped)
            .sort((a, b) => a._minId - b._minId)
            .map(({ _minId, ...block }) => block)
    },
}
