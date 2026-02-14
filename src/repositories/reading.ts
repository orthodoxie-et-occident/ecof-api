import { db } from "../utils/database.js"

export const readings = {
    async getScriptureReading(id: string) {
        const rows = await db`
                SELECT book_txt, reading
                FROM temporal
                WHERE id = ${id}
            `
        return rows || null
    },
}
