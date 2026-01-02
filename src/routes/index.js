import { Hono } from 'hono'
import indexes from './indexesRoute.js'

const routes = new Hono()

routes.route('/api/indexes', indexes)

export default routes
