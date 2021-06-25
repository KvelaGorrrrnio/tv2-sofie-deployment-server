import { status as _status, send as _send } from '../jsend'
import { code2status } from './status-codes'

export * from '../jsend'

export const status = _status(code2status)
export const send = _send(code2status)

