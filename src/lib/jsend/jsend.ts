import * as structure from './structure'

/**
 * @desc   Returns success response.
 * @param  data: Result of request.
 */
export const success = (data: any = null): structure.JSendSuccess => ({
  status: structure.JSendStatus.Success,
  data
})

/**
 * @desc   Returns fail response.
 * @param  data: Result of fail.
 */
export const fail = (data: any = null): structure.JSendFail => ({
  status: structure.JSendStatus.Fail,
  data
})

/**
 * @desc   Returns error response
 * @param  message: Error message.
 * @param  code?: Corresponding error code if appropriate.
 * @param  data: Error related data if appropriate.
 */
export const error = <JSendErrorCode>(message: string, code?: JSendErrorCode, data?: any): structure.JSendError<JSendErrorCode> => ({
  status: structure.JSendStatus.Error,
  message,
  ...(code && { code }),
  ...(data && { data }),
})
