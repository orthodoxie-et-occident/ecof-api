import { Hono } from "hono"
import { getSaintLives } from "./service"

const vita = new Hono()

vita.get("/:id", async (c) => {
    const id = c.req.param("id")
    const vita = await getSaintLives(id)
    return c.json(vita)
})

export default vita
