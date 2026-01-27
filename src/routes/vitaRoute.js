import { Hono } from "hono"
import { getVita } from "../services/vitaService.js"

const vita = new Hono()

vita.get("/:id", async (c) => {
    const id = c.req.param("id")
    const vita = await getVita(id)
    return c.json(vita)
})

export default vita
