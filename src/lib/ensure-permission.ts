import { hasPermission } from '../services/user.service'
import { logger } from '../lib/logger'
import * as JSend from '../lib/jsend-response'

export const ensurePermission = (user: any, environment: string, target: string) => {
  if (!hasPermission(user, environment, target)) {
    logger.debug(`User '${user.username}' does not have permission to perform action in '${environment}' on '${target}'.`)
    throw JSend.fail('User does not have permission to perform action.')
  }
}
