import { allNews } from "./repository"
import { parseMarkdown } from "../../utils/markdown.js"
import { applyFrenchTypography } from "../../utils/typography.js"

export async function getNews() {
    const news = await allNews.getNews()
    return news
}

export async function getNewsById(id) {
    const result = await allNews.getNewsById(id)
    if (!result) return null

    const { content, ...rest } = result

    return {
        ...rest,
        text: parseMarkdown(applyFrenchTypography(content)),
    }
}
