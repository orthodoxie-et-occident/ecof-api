import { db } from "../../utils/pg_database"

const R2_PUBLIC_BASE = process.env.R2_PUBLIC_URL

function buildImageUrl(id) {
    return `${R2_PUBLIC_BASE}/${id}.webp`
}

export const synaxarVita = {
    async getVita(id) {
        const rows = await db`
          SELECT v.v_short as vie_b, v.v_long as vita_long, v.v_liturgy as vita_liturgy,
                 v.has_img, s.mois, s.jour,
                 s.prefixe, s.saint
          FROM sanctoral s
          LEFT JOIN vita v ON v.vies_id = s.vies_id
          WHERE s.vies_id = ${id}
        `
        const row = rows[0]
        if (!row) return null

        const { has_img, ...rest } = row

        return {
            ...rest,
            img: has_img ? buildImageUrl(id) : null,
        }
    },
}
