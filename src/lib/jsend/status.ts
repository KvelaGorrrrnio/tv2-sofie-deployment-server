import { JSendStatus, JSendResponse } from './structure'

/**
 * @desc   Returns the http status code for a given JSendResponse
 * @param  code2status: Function that converts a JSendErrorCode to a http status code.
 * @param  response: The JSend response.
 */
export const status = <JSendErrorCode>(code2status: (code: JSendErrorCode) => bigint) => (response: JSendResponse<JSendErrorCode>): number => {
  switch (response.status) {
    case JSendStatus.Success: return 200
    case JSendStatus.Fail:    return 400
    case JSendStatus.Error:   return response.code ? Number(code2status(response.code)) : 500
  }
}
