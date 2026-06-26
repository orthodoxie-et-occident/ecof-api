import { Hono } from "hono"
import { serveStatic } from "hono/bun"

const images = new Hono()

const root = `${import.meta.dir}/../../assets`.replace(/\\/g, "/")

images.use(
    "/*",
    serveStatic({
        root,
        rewriteRequestPath: (path) => path.replace(/^\/images/, ""),
    }),
)

export default images
