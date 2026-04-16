import { Hono } from "hono"
import { getMapData } from "../services/mapData"

const mapData = new Hono()

mapData.get("/", async (c) => {
    try {
        const poi = await getMapData()
        return c.json(poi)
    } catch (e) {
        console.error("mapData error:", e)
        return c.json({ error: "Erreur lors de la récupération des paroisses" }, 500)
    }
})

export default mapData
