import { db } from "../utils/pg_database"

export const readings = {
    async getScriptureReading(id) {
        const rows = await db`
      SELECT book_txt, reading
      FROM readings
      WHERE id = ${id}
    `
        return rows
    },
}
