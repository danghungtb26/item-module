import { body, ValidationChain } from 'express-validator'
import { BaseValidator } from './base'

class ItemTypeValidator extends BaseValidator {
  get create(): ValidationChain[] {
    return [
      body('name').isString().notEmpty(),
      body('description').isString(),
      body('attributes').isArray(),
      body('statuses').isArray(),
    ]
  }
}

export default new ItemTypeValidator()
