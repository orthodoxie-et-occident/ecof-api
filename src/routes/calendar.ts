import { Hono } from "hono"
import { getCalendarInfo } from "../services/calendar.js"

const calendar = new Hono()

calendar.get("/:date", async (c) => {
    const date = c.req.param("date")
    const calendarInfo = await getCalendarInfo(date)
    return c.json(calendarInfo)
})

export default calendar
