import { body, ValidationChain } from 'express-validator'
import { BaseValidator } from './base'

class ItemStatusValidator extends BaseValidator {
  get create(): ValidationChain[] {
    return [body('name').isString().notEmpty(), body('description').isString()]
  }
}

export default new ItemStatusValidator()
