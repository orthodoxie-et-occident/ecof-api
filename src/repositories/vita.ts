import { db } from "../utils/database.js"

export const synaxarVita = {
    async getVita(id: string) {
        const rows = await db`
                SELECT vies.vie_b, vies.vita_long, vies.vita_liturgy, vies.img, synaxaire.mois, synaxaire.jour, synaxaire.prefixe, synaxaire.saint
                FROM vies
                LEFT JOIN synaxaire ON vies.id = synaxaire.vies_id
                WHERE vies.id = ${id}
            `
        return rows[0] || null
    },
}
