import { Hono } from "hono"
import { getNews, getNewsById } from "../services/news.js"

const news = new Hono()

news.get("/", async (c) => {
    const article = await getNews()
    return c.json(article)
})

news.get("/:id", async (c) => {
    const id = c.req.param("id")
    const result = await getNewsById(id)

    if (!result) {
        return c.json({ error: "News not found" }, 404)
    }

    return c.json(result)
})

export default news
