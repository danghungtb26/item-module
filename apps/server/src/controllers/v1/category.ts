import { injectable } from 'inversify'
import { Category } from '@db/models'
import { NextFunction, Request, Response } from 'express'
import { HttpException } from '@exceptions/HttpException'
import { HttpResponse } from '@responses/HttpResponse'
import { isNull, isString, isUndefined } from 'lodash'
import { Transaction } from 'sequelize/types'
import db from '@db'
import { pick } from '@utils/lodash'

@injectable()
export class CategoryController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const categories = await Category.findAndCountAll({
        offset: (page - 1) * 10,
        limit,
        include: [{ model: Category, as: 'parent' }],
      })
      return res.json(
        new HttpResponse({
          data: {
            rows: categories.rows.map(i => i.toJSON()),
            paging: {
              current_page: page,
              limit,
              total_page: Math.ceil(categories.count / limit),
              total: categories.count,
            },
          },
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = isString(req.params.id) ? req.params.id : ''
      return res.json(
        new HttpResponse({
          data: Category.findByPk(id, {
            include: [
              {
                model: Category,
                as: 'parent',
              },
            ],
          }),
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    let transaction: Transaction | undefined

    try {
      transaction = await db.transaction()
      const parentId = req.body.parentId
      const body = this.getAttributeBody(req)

      if (!isNull(parentId)) {
        const num = await Category.findByPk(parentId)
        if (!num) {
          throw new Error('Wrong parameter')
        }

        num.increment('subCategoryCount', { transaction })
      }

      const category = await Category.create(body, {
        transaction,
        include: [
          {
            model: Category,
            as: 'parent',
          },
        ],
      })

      await transaction.commit()
      return res.json(
        new HttpResponse({
          data: category,
        }).toJson()
      )
    } catch (error: any) {
      await transaction?.rollback()
      return next(new HttpException(500, error.message))
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const body = this.getAttributeBody(req)
    let transaction: Transaction | undefined

    try {
      transaction = await db.transaction()
      const category = await Category.findOne({
        where: {
          id,
        },
      })

      if (category) {
        const preParentId = category.parentId

        const newParentId = req.body?.parentId

        if (!isUndefined(newParentId) && preParentId !== newParentId) {
          if (!isNull(newParentId)) {
            const newParentCategory = await Category.findOne({
              where: {
                id: newParentId,
              },
            })

            if (!newParentCategory) {
              throw new Error('Parent category not found')
            }

            await newParentCategory.increment('subCategoryCount', { by: 1, transaction })
          }

          if (!isNull(preParentId)) {
            const parentCategory = await Category.findOne({
              where: {
                id: preParentId,
              },
            })
            await parentCategory?.decrement('subCategoryCount', { by: 1, transaction })
          }
        }

        await Category.update(body, { where: { id }, transaction })

        const categoryRes = await Category.findOne({
          where: { id },
          transaction,
          include: [{ model: Category, as: 'parent' }],
        })
        await transaction?.commit()
        return res.json(
          new HttpResponse({
            data: categoryRes,
          })
        )
      }
      throw new Error('Not found')
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return Category.destroy({ where: { id: req.params.id } })
      .then(num => {
        if (num === 1) {
          return res.json(new HttpResponse({ data: true }).toJson())
        }
        throw new Error('Not found')
      })
      .catch((e: any) => {
        return next(new HttpException(500, e.message))
      })
  }

  findByPk = (id: string) => {
    return Category.findByPk(id)
  }

  findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
    page = 1,
    limit = 10,
  }) => {
    const categories = await Category.findAndCountAll({
      offset: (page - 1) * 10,
      limit,
    })
    return {
      data: categories.rows.map(i => i.toJSON()),
      paging: {
        current_page: page,
        limit,
        total_page: Math.ceil(categories.count / limit),
        total: categories.count,
      },
    }
  }

  findOne = async (id: number | string) => {
    const category = await Category.findOne({
      where: {
        id,
      },
    })
    if (category) {
      return {
        data: category,
      }
    }

    throw new Error('Not found')
  }

  deleteByPk = async (id: string) => {
    return Category.destroy({ where: { id } })
      .then(num => {
        if (num === 1) {
          return true
        }
        return false
      })
      .catch(() => {
        return false
      })
  }

  private getAttributeBody = (req: Request) => {
    return pick(req.body, ['name', 'description', 'parentId'])
  }
}
