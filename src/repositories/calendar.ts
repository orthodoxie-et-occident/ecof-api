import { db } from "../utils/database.js"

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
        return rows
    },

    async getTemporalReadings(temporalIndex: number) {
        const rows = await db`
            SELECT temporal.id, temporal.book_txt
            FROM temporal 
            JOIN temporal_blocks ON temporal.block = block_id
            WHERE temporalIndex = ${temporalIndex}
            ORDER BY temporal.id ASC
        `
        return rows
    },

    async getSanctoralReadings(sanctoralIndex: number) {
        const rows = await db`
            SELECT sanctoral.id, sanctoral.book_txt
            FROM sanctoral 
            JOIN sanctoral_blocks ON sanctoral.block = block_id
            WHERE sanctoralIndex = ${sanctoralIndex}
            ORDER BY sanctoral.id ASC
        `
        return rows
    },
}
