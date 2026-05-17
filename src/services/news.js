import { allNews } from "../repositories/news"
import { parseMarkdown } from "../utils/markdown.js"

export async function getNews() {
    const news = await allNews.getNews()
    return news
}

export async function getNewsById(id) {
    const result = await allNews.getNewsById(id)
    if (!result) return null

    return {
        ...result,
        text: parseMarkdown(result.text),
    }
}
