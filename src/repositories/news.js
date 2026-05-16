import { db } from "../utils/database"

export const allNews = {
    async getNews() {
        const rows = await db`
      SELECT id, title, author, slug, published_at
      FROM news
      ORDER BY published_at DESC
    `
        return rows || []
    },

    async getNewsById(id) {
        const rows = await db`
        SELECT title, author, slug, published_at, text
        FROM news
        WHERE id = ${id}
        LIMIT 1
    `
        return rows[0] ?? null
    },
}
