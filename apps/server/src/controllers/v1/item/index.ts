import { injectable } from 'inversify'
import { Category, Item, ItemStatus, ItemType } from '@db/models'
import { HttpResponse } from '@responses/HttpResponse'
import { HttpException } from '@exceptions/HttpException'
import { NextFunction, Request, Response } from 'express'

@injectable()
export class ItemController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const items = await Item.findAndCountAll({
        offset: (page - 1) * 10,
        limit,
        include: this.getInclude(),
      })
      return res.json(
        new HttpResponse({
          data: {
            data: items.rows,
            paging: {
              current_page: page,
              limit,
              total_page: Math.ceil(items.count / limit),
              total: items.count,
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
      const id = req.params.id
      return res.json(
        new HttpResponse({
          data: Item.findByPk(id, { include: this.getInclude() }),
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Item.create(req.body, { include: this.getInclude() })
      return res.json(
        new HttpResponse({
          data: item,
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
      const item = await Item.findOne({
        where: {
          id,
        },
      })

      if (item) {
        await Item.update(body, { where: { id } })
        const item = await Item.findOne({ where: { id }, include: this.getInclude() })
        return res.json(
          new HttpResponse({
            data: item,
          })
        )
      }
      throw new Error('Not found')
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return Item.destroy({ where: { id: req.params.id } })
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
    return Item.findByPk(id)
  }

  findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
    page = 1,
    limit = 10,
  }) => {
    const items = await Item.findAndCountAll({
      offset: (page - 1) * 10,
      limit,
      include: this.getInclude(),
    })
    return {
      data: items.rows,
      paging: {
        current_page: page,
        limit,
        total_page: Math.ceil(items.count / limit),
        total: items.count,
      },
    }
  }

  findOne = async (id: number | string) => {
    const item = await Item.findOne({
      where: {
        id,
      },
      include: this.getInclude(),
    })
    if (item) {
      return {
        data: item,
      }
    }

    throw new Error('Item not found')
  }

  deleteByPk = async (id: string) => {
    return Item.destroy({ where: { id } })
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

  getInclude() {
    return [Category, ItemStatus, ItemType]
  }

  getAttributes = (req: Request, res: Response) => {
    return res.json(new HttpResponse({ data: this.attributes }))
  }

  get attributes() {
    return Item.attributes
  }
}
