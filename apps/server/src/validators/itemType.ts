import { body, ValidationChain } from 'express-validator'
import { isArray, isNumber } from 'lodash'
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

  get update(): ValidationChain[] {
    return [
      body('statuses')
        // .isJSON()
        .custom((value: Record<string, any>) => {
          console.log('🚀 ~ file: item.ts ~ line 15 ~ ItemValidator ~ .custom ~ value', value)
          if (value.update && !isArray(value.update)) {
            throw new Error('types.update must be array')
          }

          if (value.new && !isArray(value.new)) {
            throw new Error('types.new must be array')
          }

          if (value.delete && !isArray(value.delete)) {
            throw new Error('types.delete must be array')
          }

          if (value.new) {
            value.new.forEach((i: any) => {
              if (!isNumber(i)) throw new Error('value.new must be include number')
            })
          }

          if (value.update) {
            value.update.forEach((i: any) => {
              if (!isNumber(i.id) || !isNumber(i.status_id)) {
                throw new Error('Missing parameter')
              }
            })
          }

          if (value.delete) {
            value.delete.forEach((i: any) => {
              if (!isNumber(i)) throw new Error('value.delete must be include number')
            })
          }

          return true
        }),
    ]
  }
}

export default new ItemTypeValidator()
