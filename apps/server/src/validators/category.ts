import { body, ValidationChain } from 'express-validator'
import { BaseValidator } from './base'

class CategoryValidator extends BaseValidator {
  get create() {
    return [
      body('name').isString().notEmpty().withMessage('Missing parameter Name'),
      body('description').isString().optional({ nullable: true }),
      body('parentId').isNumeric().optional({ nullable: true }),
    ]
  }

  get update(): ValidationChain[] {
    return [
      body('name').isString().optional({ nullable: true }),
      body('description').isString().optional({ nullable: true }),
      body('parentId').isNumeric().optional({ nullable: true }),
    ]
  }
}

export default new CategoryValidator()
