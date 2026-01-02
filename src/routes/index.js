import { Hono } from 'hono'
import easterRoute from './easterRoute.js'

const routes = new Hono()

routes.route('/api/easter', easterRoute)

export default routes
