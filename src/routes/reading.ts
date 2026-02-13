import { Hono } from "hono"
import { getReading } from "../services/reading.js"

const reading = new Hono()

reading.get("/:id", async (c) => {
    const id = c.req.param("id")
    const reading = await getReading(id)
    return c.json(reading)
})

export default reading
