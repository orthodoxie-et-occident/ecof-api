import { Hono } from 'hono'
import temporalIndex from './temporalRoute.js'

const routes = new Hono()

routes.route('/api/temporal', temporalIndex)

export default routes
