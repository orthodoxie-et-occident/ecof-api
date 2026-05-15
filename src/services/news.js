import { allNews } from "../repositories/news"

export async function getNews() {
    const news = await allNews.getNews()
    return news
}
