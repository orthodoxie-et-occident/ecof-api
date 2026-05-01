import { db } from "../utils/database"

export type ScriptureReading = {
    book_txt: string | null
    reading: string | null
}

export const readings = {
    async getScriptureReading(id: string): Promise<ScriptureReading[]> {
        const rows = await db`
      SELECT book_txt, reading
      FROM readings
      WHERE id = ${id}
    `
        return rows as ScriptureReading[]
    },
}
