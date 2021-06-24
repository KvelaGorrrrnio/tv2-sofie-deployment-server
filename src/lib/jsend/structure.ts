/**
 * @desc   Types of JSend responses
 */
export enum JSendStatus {
  Success = 'success',
  Fail    = 'fail',
  Error   = 'error',
}

/**
 * @desc   Interface of a success response
 */
export interface JSendSuccess {
  status: JSendStatus.Success,
  data: any,
}

/**
 * @desc   Interface of a fail response
 */
export interface JSendFail {
  status: JSendStatus.Fail,
  data: any,
}

/**
 * @desc   Interface of an error response
 */
export interface JSendError<JSendErrorCode> {
  status: JSendStatus.Error,
  message: string,
  code?: JSendErrorCode,
  data?: any,
}

export type JSendResponse<JSendErrorCode> = JSendSuccess | JSendFail | JSendError<JSendErrorCode>
