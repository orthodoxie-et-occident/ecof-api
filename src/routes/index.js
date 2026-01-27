import { Hono } from "hono"
import calendar from "./calendar.js"
import parish from "./parish.js"
import vita from "./vitas.js"

const routes = new Hono()

routes.route("/api/calendar", calendar)
routes.route("/api/parish", parish)
routes.route("/api/vita", vita)

export default routes
