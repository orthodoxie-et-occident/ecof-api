import { db } from "../utils/database.js"
import { parseMarkdown } from "../utils/markdown.js"

export const synaxarVita = {
    async getVita(id: string) {
        const rows = await db`
      SELECT vies.vie_b, vies.vita_long, vies.vita_liturgy,
             vies.img, synaxaire.mois, synaxaire.jour,
             synaxaire.prefixe, synaxaire.saint
      FROM vies
      LEFT JOIN synaxaire ON vies.id = synaxaire.vies_id
      WHERE vies.id = ${id}
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
