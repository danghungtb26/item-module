import { injectable } from 'inversify'
import { Category } from '@db/models'
import { NextFunction, Request, Response } from 'express'
import { HttpException } from '@exceptions/HttpException'
import { HttpResponse } from '@responses/HttpResponse'
import { isString } from 'lodash'

@injectable()
export class CategoryController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const categories = await Category.findAndCountAll({
        offset: (page - 1) * 10,
        limit,
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
          data: Category.findByPk(id),
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await Category.create(req.body)
      return res.json(
        new HttpResponse({
          data: category,
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const body = req.body
    try {
      const category = await Category.findOne({
        where: {
          id,
        },
      })

      if (category) {
        await Category.update(body, { where: { id } })
        const category = await Category.findOne({ where: { id } })
        return res.json(
          new HttpResponse({
            data: category,
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
}
