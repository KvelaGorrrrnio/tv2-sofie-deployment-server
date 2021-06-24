import { Router } from 'express'
import { routes as apiRoutes } from './api'

export const routes = Router()

routes.use('/api', apiRoutes)
