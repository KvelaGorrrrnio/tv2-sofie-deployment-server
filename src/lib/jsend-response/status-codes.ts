import { JSendErrorCode } from './error'

export const code2status = (code: JSendErrorCode): bigint => {
  switch (code) {
    case JSendErrorCode.NOT_AUTHORIZED: return 401n
  }
}
