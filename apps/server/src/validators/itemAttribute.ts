import { body, param, ValidationChain } from 'express-validator'
import { BaseValidator } from './base'

class ItemAttributeValidator extends BaseValidator {
  get create(): ValidationChain[] {
    return [
      body('name').isString().notEmpty(),
      body('description').isString(),
      body('required').optional({ nullable: true }).isBoolean(),
      body('valueType')
        .optional({ nullable: true })
        .matches(/string|number|boolean|array|json/),
    ]
  }

  get update(): ValidationChain[] {
    return [
      param('id').isNumeric(),
      body('name').optional({ nullable: true }).isString().notEmpty(),
      body('description').optional({ nullable: true }).isString(),
      body('required').optional({ nullable: true }).isBoolean(),
      body('valueType')
        .optional({ nullable: true })
        .matches(/string|number|boolean|array|json/),
    ]
  }
}

export default new ItemAttributeValidator()
