import { Response, Request } from 'express'
import { logger } from '../lib/logger'
import Joi, { validateAsync } from '../lib/validate'
import * as JSR from '../lib/jsend-response'

import * as AnsibleDevelopService from '../services/ansible-develop.service'
import * as AnsibleProductionService from '../services/ansible-production.service'

/**
 * @desc   Controller for deploying to develop (Zero)
 */
export const develop = (request: Request, response: Response) =>
  validateAsync(request.body, Joi.object({
    target: Joi.string()
  }))
  .then(({ target }) => {
    switch (target) {
      default: 
        logger.error(`Unknown target '${ target }' received from ${ (request as any).accessInfo.user }`)
        JSR.$fail()
    }
  })
  .then(() => JSR.send(response, JSR.success()))
  .catch(error => JSR.send(response, error))

export const stage = (request: Request, response: Response) => 
  JSR.send(response, JSR.success('Stage endpoint is not yet implemented'))

export const production = (request: Request, response: Response) =>
  validateAsync(request.body, Joi.object({
    target: Joi.string()
  }))
  .then(({ target }) => {
    switch (target) {
      case 'deployment-server': return AnsibleProductionService.deployment_server()
      case 'health-monitor': return AnsibleProductionService.health_monitor()
      default: 
        logger.error(`Unknown target '${ target }' received from ${ (request as any).accessInfo.user }`)
        JSR.$fail()
    }
  })
  .then(() => JSR.send(response, JSR.success()))
  .catch(error => JSR.send(response, error))
