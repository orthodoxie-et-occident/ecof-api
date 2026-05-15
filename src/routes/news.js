import { Hono } from "hono"
import { getNews } from "../services/news.js"

const news = new Hono()

news.get("/", async (c) => {
    const article = await getNews()
    return c.json(article)
})

export default news
