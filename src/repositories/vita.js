import { db } from "../utils/database.js"

export const synaxar = {
    async getVita(id) {
        const rows = await db`
                SELECT vie_b, vie_l 
                FROM vies
                WHERE id = ${id}
            `
        return rows[0] || null
    },
}
