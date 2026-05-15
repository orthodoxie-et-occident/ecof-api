import { db } from "../utils/database"

export const synaxarSaints = {
    async getSaints() {
        const rows = await db`
                SELECT saint, id as vies_id, id
                FROM synaxaire
                WHERE calendrier != 2
                ORDER BY saint ASC
            `
        return rows || null
    },
}
