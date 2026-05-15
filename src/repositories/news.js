import { db } from "../utils/database"

export const allNews = {
  async getNews() {
    const rows = await db`
      SELECT title, text, author, slug, published_at
      FROM news
      ORDER BY published_at DESC
    `

    return rows || []
  },
}