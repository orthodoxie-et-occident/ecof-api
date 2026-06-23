import { Hono } from "hono"
import { compress } from "hono/compress"
import { cors } from "hono/cors"
import calendar from "./routes/calendar"
import parish from "./routes/parish"
import news from "./routes/news"
import vita from "./modules/vita/routes"
import reading from "./routes/reading"
import synaxar from "./routes/synaxar"
import images from "./routes/images"
import privacy from "./routes/privacy"
import support from "./routes/support"
import appConfigRouter from "./routes/appConfig"
import mapData from "./modules/mapData/routes"

const app = new Hono()

app.use("*", cors())
app.use("*", compress())

app.route("/api/calendar", calendar)
app.route("/api/parish", parish)
app.route("/api/vita", vita)
app.route("/api/news", news)
app.route("/api/reading", reading)
app.route("/api/synaxar", synaxar)
app.route("/api/images", images)
app.route("/api/privacy", privacy)
app.route("/api/support", support)
app.route("/api/app-config", appConfigRouter)
app.route("/api/map-data", mapData)

export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
}
