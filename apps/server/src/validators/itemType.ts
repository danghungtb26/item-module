import { body, ValidationChain } from 'express-validator'
import { isArray, isNumber } from 'lodash'
import { BaseValidator } from './base'

class ItemTypeValidator extends BaseValidator {
  get create(): ValidationChain[] {
    return [
      body('name').isString().notEmpty(),
      body('description').optional({ nullable: true }).isString(),
      body('attributes').custom((value: any) => {
        if (!isArray(value)) {
          throw new Error('attributes must be array number')
        }

        value.forEach((i: any) => {
          if (!isNumber(i)) {
            throw new Error('attributes must be array number')
          }
        })

        return true
      }),
      body('statuses').custom((value: any) => {
        if (!isArray(value)) {
          throw new Error('statuses must be array number')
        }

        value.forEach((i: any) => {
          if (!isNumber(i)) {
            throw new Error('statuses must be array number')
          }
        })

        return true
      }),
    ]
  }

  get update(): ValidationChain[] {
    return [
      ...this.show,
      //   body('statuses').custom((value: Record<string, any>) => {
      //     if (value.update && !isArray(value.update)) {
      //       throw new Error('types.update must be array')
      //     }

      //     if (value.new && !isArray(value.new)) {
      //       throw new Error('types.new must be array')
      //     }

      //     if (value.delete && !isArray(value.delete)) {
      //       throw new Error('types.delete must be array')
      //     }

      //     if (value.new) {
      //       value.new.forEach((i: any) => {
      //         if (!isNumber(i)) throw new Error('value.new must include number')
      //       })
      //     }

      //     if (value.update) {
      //       value.update.forEach((i: any) => {
      //         if (!isNumber(i.id) || !isNumber(i.status_id)) {
      //           throw new Error('Missing parameter')
      //         }
      //       })
      //     }

      //     if (value.delete) {
      //       value.delete.forEach((i: any) => {
      //         if (!isNumber(i)) throw new Error('value.delete must include number')
      //       })
      //     }

      //     return true
      //   }),
      body('name').optional({ nullable: true }).isString(),
      body('description').optional({ nullable: true }).isString(),
      body('attributes')
        .optional({ nullable: true })
        .custom((value: any) => {
          if (!isArray(value)) {
            throw new Error('attributes must be array number')
          }

          value.forEach((i: any) => {
            if (!isNumber(i)) {
              throw new Error('attributes must be array number')
            }
          })

          return true
        }),
      body('statuses')
        .optional({ nullable: true })
        .custom((value: any) => {
          if (!isArray(value)) {
            throw new Error('statuses must be array number')
          }

          value.forEach((i: any) => {
            if (!isNumber(i)) {
              throw new Error('statuses must be array number')
            }
          })

          return true
        }),
    ]
  }
}

export default new ItemTypeValidator()
