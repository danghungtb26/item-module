import { body, param, ValidationChain } from 'express-validator'
import { BaseValidator } from './base'

class ItemAttributeValidator extends BaseValidator {
  get create(): ValidationChain[] {
    return [body('name').isString().notEmpty(), body('description').isString()]
  }

  get update(): ValidationChain[] {
    return [
      param('id').isNumeric(),
      body('name').optional({ nullable: true }).isString().notEmpty(),
      body('description').optional({ nullable: true }).isString(),
    ]
  }
}

export default new ItemAttributeValidator()
