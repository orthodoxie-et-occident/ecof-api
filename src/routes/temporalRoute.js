import { Hono } from 'hono'
import { getTemporalIndex } from '../services/dateService.js'

const temporal = new Hono()

temporal.get('/', (c) => {
  const date = c.req.query('date')
  const temporalIndex = getTemporalIndex(date)
  return c.json({
    temporalIndex
  })
})

export default temporal
