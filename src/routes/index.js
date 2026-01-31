import { Hono } from "hono"
import { compress } from "hono/compress"
import { cors } from "hono/cors"
import calendar from "./calendar.js"
import parish from "./parish.js"
import vita from "./vita.js"
import synaxar from "./synaxar.js"
import images from "./images.js"

const routes = new Hono()

routes.use("*", cors())
routes.use("*", compress())

routes.route("/api/calendar", calendar)
routes.route("/api/parish", parish)
routes.route("/api/vita", vita)
routes.route("/api/synaxar", synaxar)
routes.route("/api/images", images)

export default routes
