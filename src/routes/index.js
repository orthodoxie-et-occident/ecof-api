import { Hono } from "hono"
import calendar from "./calendarRoute.js"
import parish from "./parishRoute.js"
import vita from "./vitaRoute.js"

const routes = new Hono()

routes.route("/api/calendar", calendar)
routes.route("/api/parish", parish)
routes.route("/api/vita", vita)

export default routes
