import { Hono } from "hono"
import { serveStatic } from "hono/bun"

const images = new Hono()

// Serve static files from src/assets
images.use(
    "/*",
    serveStatic({
        root: "./src",
        rewriteRequestPath: (path) => path.replace(/^\/api\/images/, "/assets"),
    }),
)

export default images
