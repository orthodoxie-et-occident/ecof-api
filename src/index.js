import { Hono } from "hono"
import { compress } from "hono/compress"
import { cors } from "hono/cors"
import calendar from "./modules/calendar/routes"
import parish from "./modules/parish/routes"
import news from "./modules/news/routes"
import vita from "./modules/vita/routes"
import reading from "./modules/reading/routes"
import synaxar from "./modules/synaxar/routes"
import images from "./modules/images/routes"
import privacy from "./modules/privacy/routes"
import support from "./modules/support/routes"
import mapData from "./modules/mapData/routes"

const app = new Hono()

app.use("*", cors())
app.use("*", compress())

app.route("/calendar", calendar)
app.route("/parish", parish)
app.route("/vita", vita)
app.route("/news", news)
app.route("/reading", reading)
app.route("/synaxar", synaxar)
app.route("/images", images)
app.route("/privacy", privacy)
app.route("/support", support)
app.route("/map-data", mapData)

export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
}
