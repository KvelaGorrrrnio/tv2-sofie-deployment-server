import { Response } from 'express'
import { success, fail, error } from './jsend'
import { JSendResponse } from './structure'
import { status } from './status'

/**
 * @desc   Wrapper for setting http status and sending JSend response
 */
export const send = <JSendErrorCode>(code2status: (code: JSendErrorCode) => bigint) => (response: Response, jsendResponse: JSendResponse<JSendErrorCode>): Response => {
  return response.status(status(code2status)(jsendResponse)).send(jsendResponse)
}
