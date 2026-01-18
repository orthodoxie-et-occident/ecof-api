import { Hono } from "hono"
import calendar from "./calendarRoute.js"
import parish from "./parishRoute.js"

const routes = new Hono()

routes.route("/api/calendar", calendar)
routes.route("/api/parish", parish)

export default routes
