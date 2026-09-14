import { db } from "../../utils/pg_database"

export const synaxarSaints = {
    async getSaints() {
        const rows = await db`
                SELECT saint, vies_id, id
                FROM sanctoral
                WHERE calendrier != 2
                ORDER BY saint ASC
            `
        return rows || null
    },

    async getSaintsByDate(mois, jour) {
        const rows = await db`
                SELECT saint, id
                FROM sanctoral
                WHERE calendrier != 2
                AND mois = ${mois}
                AND jour = ${jour}
                ORDER BY id ASC
            `
        return rows || null
    },
}
