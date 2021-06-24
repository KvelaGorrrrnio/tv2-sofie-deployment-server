import { JSendFail, JSendError } from './structure'
import { fail, error } from './jsend'

/**
 * @desc  Wrapper for returning a fail response as promise.
 */
export const $fail = (data: any = null) => {
  throw fail(data)
}

/**
 * @desc  Wrapper for returning an error response as promise.
 */
export const $error = <JSendErrorCode>(message: string, code?: JSendErrorCode, data?: any) => {
  throw error(message, code, data)
}
