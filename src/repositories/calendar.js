import { db } from "../utils/database.js"

export const calendar = {
    async getSynaxar(month, day) {
        const rows = await db`
            SELECT synaxaire.principal, synaxaire.prefixe, synaxaire.saint, 
                   vies.id, vies.vie_l, vies.vie_b, vies.img
            FROM synaxaire
            JOIN vies ON synaxaire.vies_id = vies.id
            WHERE mois = ${month} AND jour = ${day} 
              AND principal IN (0, 1) AND calendrier != 0
        `
        return rows
    },

    async getTemporalReadings(temporalIndex) {
        const rows = await db`
            SELECT temporal.block, temporal.book_txt, temporal.reading, 
                   temporal_blocks.block_title
            FROM temporal 
            JOIN temporal_blocks ON temporal.block = block_id
            WHERE temporalIndex = ${temporalIndex}
            ORDER BY temporal.id ASC
        `
        return rows
    },

    async getSanctoralReadings(sanctoralIndex) {
        const rows = await db`
            SELECT sanctoral.block, sanctoral.book_txt, sanctoral.reading, 
                   sanctoral_blocks.block_title
            FROM sanctoral 
            JOIN sanctoral_blocks ON sanctoral.block = block_id
            WHERE sanctoralIndex = ${sanctoralIndex}
            ORDER BY sanctoral.id ASC
        `
        return rows
    },
}
