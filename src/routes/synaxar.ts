import { Hono } from "hono"
import { getSaints } from "../services/synaxar.js"

const synaxar = new Hono()

synaxar.get("/", async (c) => {
    const saints = await getSaints()
    return c.json(saints)
})

export default synaxar
