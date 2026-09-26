import { Hono } from "hono"
import { compress } from "hono/compress"
import { cors } from "hono/cors"
import { synaxarRoutes } from "./features/synaxar/synaxar.routes"
import { mapRoutes } from "./features/map/map.routes"
import { readingRoutes } from "./features/reading/reading.routes"
import { newsRoutes } from "./features/news-section/news-section.routes"
import { parishRoutes } from "./features/parish/parish.routes"
import { calendarRoutes } from "./features/liturgical-calendar/liturgical-calendar.route"
import { versionRoutes } from "./features/version/version.routes"

const app = new Hono()

app.use("*", cors())
app.use("*", compress())

app.route("/synaxar", synaxarRoutes)
app.route("/map", mapRoutes)
app.route("/reading", readingRoutes)
app.route("/news", newsRoutes)
app.route("/parish", parishRoutes)
app.route("/calendar", calendarRoutes)
app.route("/version", versionRoutes)

export default app
