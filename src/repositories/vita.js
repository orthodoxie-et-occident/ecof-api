import { db } from "../utils/database"

export const synaxarVita = {
    async getVita(id) {
        const rows = await db`
          SELECT v_short as vie_b, v_long as vita_long, v_liturgy as vita_liturgy,
                 img, mois, jour,
                 prefixe, saint
          FROM synaxaire
          WHERE id = ${id}
        `
        return rows[0] ?? null
    },
}
