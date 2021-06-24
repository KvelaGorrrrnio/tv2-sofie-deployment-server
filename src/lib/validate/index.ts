import * as Joi from 'joi'
import * as JSend from '../jsend'
import { fromJoiError } from './error'

/**
 * @desc   Wrapper for taking joi errors and transforming them to JSend response.
 * @param  input: The input to be validated.
 * @param  schema: The joi schema
 */
export const validate = (input: any, schema: Joi.Schema): any => {
  try {
    return schema.validate(input, { abortEarly: true })
  } catch (error) {
    JSend.$fail(fromJoiError(error))
  }
}

/**
 * @desc   Wrapper for taking joi errors and transforming them to JSend response.
 * @param  input: The input to be validated.
 * @param  schema: The joi schema
 */
export const validateAsync = (input: any, schema: Joi.Schema): Promise<any> => schema
  .validateAsync(input, { abortEarly: true })
  .catch(error => JSend.$fail(fromJoiError(error)))

export default Joi
