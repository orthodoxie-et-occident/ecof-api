import { Hono } from "hono"
import { getAppConfig } from "./service"

const router = new Hono()

router.get("/", (c) => {
    return c.json(getAppConfig())
})

export default router
