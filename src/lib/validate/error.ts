/**
 * @desc   List of supported input errors.
 */
export enum ValidationError {
  FIELD_REQUIRED      = 'FIELD_REQUIRED',
  FIELD_UNEXPECTED    = 'FIELD_UNEXPECTED',
  FIELD_INVALID_EMAIL = 'FIELD_INVALID_EMAIL',
  FIELD_INVALID_TYPE  = 'FIELD_INVALID_TYPE',        // Adds base prop
}

/**
 * @desc   Transforms a Joi error type to an ValidationError
 * @param  path: Object path
 * @param  type: Joi error type
 */
const joiFieldErrorType = (type: string): { code: ValidationError | string, base?: string }  => {
  switch (type) {
    case 'string.empty':
    case 'any.required':   return { code: ValidationError.FIELD_REQUIRED }
    case 'object.unknown': return { code: ValidationError.FIELD_UNEXPECTED }
    case 'string.email':   return { code: ValidationError.FIELD_INVALID_EMAIL }
    case 'number.base':
    case 'string.base':    return { code: ValidationError.FIELD_INVALID_TYPE, base: type.split('.')[0] }
    default: return { code: type }
  }
}

/**
 * @desc   Transforms a Joi error to an object
 * @param  path: Object path
 * @param  type: Joi error type
 */
const joiFieldError = ({ path, type }: any): { [key: string]: any } => ({ [path.join('.')]: joiFieldErrorType(type) })

export const fromJoiError = (error: any): any => ({
  fields: error.details.map(joiFieldError).reduce((acc: object, elem: object) => ({ ...acc, ...elem }))
})



