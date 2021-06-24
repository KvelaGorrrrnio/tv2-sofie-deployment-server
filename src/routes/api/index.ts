import { Router, Response, Request } from 'express'
import { json } from 'body-parser'
import { authenticate } from '../../middleware/authenticate.middleware'

import * as controller from '../../controllers/api.controller'

export const routes = Router()

routes.use(authenticate)

routes.use(json())

routes.post('/develop', controller.develop)
routes.post('/stage', controller.stage)
routes.post('/production', controller.stage)

