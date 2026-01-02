import { Hono } from 'hono'
import { getEasterDate } from '../services/dateService.js'

const easter = new Hono()

easter.get('/', (c) => {
  const date = c.req.query('date')
  const easterDate = getEasterDate(date)
  return c.json({
    easterDate
  })
})

export default easter
