import { Hono } from 'hono'
import calendar from './calendarRoute.js'

const routes = new Hono()

routes.route('/api/calendar', calendar)

export default routes
