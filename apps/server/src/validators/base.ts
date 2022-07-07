import { param, query, ValidationChain } from 'express-validator'

export class BaseValidator {
  get page() {
    return [
      query('page')
        .optional({ nullable: true })
        .isInt({ min: 0 })
        .withMessage('Page must be number and than 0 !'),
      query('limit')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('page size must be number and than 1!'),
    ]
  }

  get list() {
    return [...this.page]
  }

  get show() {
    return [param('id').isInt()]
  }

  get create(): ValidationChain[] {
    return []
  }

  get update() {
    return [...this.show, ...this.create]
  }

  get delete() {
    return this.show
  }
}

export default new BaseValidator()
