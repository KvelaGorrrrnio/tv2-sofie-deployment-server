import { Response, Request, NextFunction } from 'express'
import { logger } from '../lib/logger'

import * as UserService from '../services/user.service'

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
  const authorization = request.header('Authorization')
  if (!authorization) {
    logger.error('No Authorization header provided.')
    return response.status(401).json({ status: 'fail', data: 'No Authorization header provided.' })
  }

  switch (true) {
    case /^Basic /i.test(authorization): return authenticateBasic(authorization.slice(6), request, response, next)
    default: 
      logger.error(`Unsupported Authorization header provided: ${authorization}`)
      return response.status(401).json({ status: 'fail', data: 'Unsupported Authorization header provided.' })
  }
}

const authenticateBasic = (basic64: string, request: Request, response: Response, next: NextFunction) => {

  // Decode and split
  const basic = Buffer.from(basic64, 'base64').toString('utf-8').split(':')

  // Check if has username and password and unwrap
  if (basic.length !== 2) {
    logger.error(`Incorrect number of authorization basic args (${ basic.length }): ${ basic.join(':') }`)
    return response.status(401).json({ status: 'fail', data: `Incorrect number of authorization basic args: ${ basic.length }` })
  }
  const [username, password] = basic

  if (!UserService.authenticate(username, password)) {
    logger.error(`Incorrect authorization basic credentials for user ${ username }.`)
    return response.status(401).json({ status: 'fail', data: 'Incorrect authorization basic credentials.' })
  }

  // Set user
  (request as any).accessInfo = { type: 'basic', user: UserService.get(username) }

  next()
}

