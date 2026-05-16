import { allNews } from "../repositories/news"

export async function getNews() {
    const news = await allNews.getNews()
    return news
}

export async function getNewsById(id) {
    const result = await allNews.getNewsById(id)
    return result
}
