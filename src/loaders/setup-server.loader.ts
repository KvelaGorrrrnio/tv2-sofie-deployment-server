import { Express } from 'express'
import { routes } from '../routes'

export const setupServer = (express: Express) => {
  express.use(routes)
}
