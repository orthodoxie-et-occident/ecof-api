import { Hono } from "hono"
import { getSaints, getSaintsByDate } from "./service.js"

const synaxar = new Hono()

// GET /synaxar
synaxar.get("/", async (c) => {
    const saints = await getSaints()
    return c.json(saints)
})

// GET /synaxar/2026-07-15
synaxar.get("/:date", async (c) => {
    const date = c.req.param("date")
    const saints = await getSaintsByDate(date)
    return c.json(saints)
})

export default synaxar
