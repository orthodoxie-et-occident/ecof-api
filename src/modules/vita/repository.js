import { db } from "../../utils/pg_database"

const R2_PUBLIC_BASE = process.env.R2_PUBLIC_URL

function buildImageUrl(key) {
    if (!key) return null
    return `${R2_PUBLIC_BASE}/${key}.webp`
}

export const synaxarVita = {
    async getVita(id) {
        const rows = await db`
          SELECT v_short as vie_b, v_long as vita_long, v_liturgy as vita_liturgy,
                 mois, jour,
                 prefixe, saint
          FROM synaxar
          WHERE id = ${id}
        `
        const row = rows[0]
        if (!row) return null

        return {
            ...row,
            img: buildImageUrl(id),
        }
    },
}
