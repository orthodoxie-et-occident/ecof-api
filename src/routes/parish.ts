import { Hono } from "hono"
import { getParishInfo } from "../services/parish.js"

const parish = new Hono()

parish.get("/:city", async (c) => {
    const city = c.req.param("city")
    const events = await getParishInfo(city)
    return c.json(events)
})

export default parish
