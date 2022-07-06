import { body, ValidationChain } from 'express-validator'
import { BaseValidator } from './base'

class ItemValidator extends BaseValidator {
  get create(): ValidationChain[] {
    return [body('name').isString(), body('description').isString()]
  }
}

export default new ItemValidator()
