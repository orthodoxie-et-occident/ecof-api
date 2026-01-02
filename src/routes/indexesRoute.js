import { Hono } from 'hono'
import { getTemporalIndex, getSanctoralIndex } from '../services/dateService.js'

const indexes = new Hono()

indexes.get('/', (c) => {
    const date = c.req.query('date')
    const temporalIndex = getTemporalIndex(date)
    const sanctoralIndex = getSanctoralIndex(date)
    return c.json({
        temporalIndex,
        sanctoralIndex
    })
})

export default indexes
