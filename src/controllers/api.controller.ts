import { Response, Request } from 'express'
import { logger } from '../lib/logger'
import Joi, { validateAsync } from '../lib/validate'
import * as JSR from '../lib/jsend-response'

import * as AnsibleDevelopService from '../services/ansible-develop.service'

/**
 * @desc   Controller for deploying to develop (Zero)
 */
export const develop = (request: Request, response: Response) =>
  validateAsync(request.body, Joi.object({
    target: Joi.string()
  }))
  .then(({ target }) => {
    switch (target) {
      case 'deploy': return AnsibleDevelopService.deploy()
      default: 
        logger.error(`Unknown target '${ target }' received from ${ (request as any).accessInfo.user }`)
        JSR.$fail()
    }
  })
  .then(() => JSR.send(response, JSR.success()))
  .catch(error => JSR.send(response, error))

export const stage = (request: Request, response: Response) => {
  JSR.send(response, JSR.success('Stage endpoint is not yet implemented'))
}

export const production = (request: Request, response: Response) => {
  JSR.send(response, JSR.success('Production endpoint is not yet implemented'))
}
