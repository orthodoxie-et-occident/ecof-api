import { db } from "../utils/database"
import { parseMarkdown } from "../utils/markdown"

export const synaxarVita = {
    async getVita(id) {
        const rows = await db`
      SELECT v_short as vie_b, v_long as vita_long, v_liturgy as vita_liturgy,
             img, mois, jour,
             prefixe, saint
      FROM synaxaire
      WHERE id = ${id}
    `
        const row = rows[0]
        if (!row) return null

        return {
            ...row,
            vie_b: parseMarkdown(row.vie_b),
            vita_long: parseMarkdown(row.vita_long),
            vita_liturgy: parseMarkdown(row.vita_liturgy),
        }
    },
}
