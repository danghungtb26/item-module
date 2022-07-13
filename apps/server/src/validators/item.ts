import { body, query, ValidationChain } from 'express-validator'
import { BaseValidator } from './base'

class ItemValidator extends BaseValidator {
  get list(): ValidationChain[] {
    return [
      query('page')
        .optional({ nullable: true })
        .isInt({ min: -1 })
        .withMessage('Page must be number and than -1 !'),
      query('limit')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('page size must be number and than 1!'),
      query('search').optional({ nullable: true }).isString().withMessage('search must be string'),
      query('start')
        .optional({ nullable: true })
        .matches(
          /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
        )
        .withMessage('start must be date time'),
      query('end')
        .optional({ nullable: true })
        .matches(
          /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
        )
        .withMessage('end must be date time'),
      query('type').optional({ nullable: true }).isNumeric().withMessage('type must be number'),
      query('status').optional({ nullable: true }).isNumeric().withMessage('status must be number'),
      query('category')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage('category must be number'),
    ]
  }

  get create(): ValidationChain[] {
    return [
      body('name').optional({ nullable: true }).isString(),
      body('description').optional({ nullable: true }).isString(),
      body('typeId').optional({ nullable: true }).isNumeric().withMessage('type must be number'),
      body('statusId')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage('status must be number'),
      body('categoryId')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage('category must be number'),
      body('title').optional({ nullable: true }).isString(),
      body('slug').optional({ nullable: true }).isSlug(),
      body('subtitle').optional({ nullable: true }).isString(),
      body('image').optional({ nullable: true }).isString(),
    ]
  }

  get update(): ValidationChain[] {
    return [
      body('name').optional({ nullable: true }).isString(),
      body('description').optional({ nullable: true }).isString(),
      body('typeId').optional({ nullable: true }).isNumeric().withMessage('type must be number'),
      body('statusId')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage('status must be number'),
      body('categoryId')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage('category must be number'),
      body('title').optional({ nullable: true }).isString(),
      body('slug').optional({ nullable: true }).isSlug(),
      body('subtitle').optional({ nullable: true }).isString(),
      body('image').optional({ nullable: true }).isString(),
    ]
  }
}

export default new ItemValidator()
