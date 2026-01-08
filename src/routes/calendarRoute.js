import { Hono } from 'hono'
import { getCalendarInfo } from '../services/calendarService.js'

const calendar = new Hono()

calendar.get('/', async (c) => {
  const date = c.req.query('date')
  const calendarInfo = await getCalendarInfo(date)
  return c.json(calendarInfo)
})

export default calendar
