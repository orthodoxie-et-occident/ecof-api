import { db } from "../../utils/pg_database"

export const synaxarSaints = {
    async getSaints() {
        const rows = await db`
                SELECT saint, id as vies_id, id
                FROM synaxar
                WHERE calendrier != 2
                ORDER BY saint ASC
            `
        return rows || null
    },
}
