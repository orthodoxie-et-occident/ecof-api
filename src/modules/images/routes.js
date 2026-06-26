import { Hono } from "hono"
import { serveStatic } from "hono/bun"

const images = new Hono()

images.use(
    "/*",
    serveStatic({
        root: "./src/assets",
    }),
)

export default images