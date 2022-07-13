import { injectable } from 'inversify'
import { Category, Item, ItemStatus, ItemType } from '@db/models'
import { HttpResponse } from '@responses/HttpResponse'
import { HttpException } from '@exceptions/HttpException'
import { NextFunction, Request, Response } from 'express'
import { pick } from '@utils/lodash'
import { Op, WhereOptions } from 'sequelize'

@injectable()
export class ItemController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const { search, start, end, type, category, status } = pick(req.query ?? {}, [
        'search',
        'start',
        'end',
        'type',
        'category',
        'status',
      ])

      const where: WhereOptions = {
        [Op.and]: {
          ...(type
            ? {
                typeId: type,
              }
            : {}),
          ...(status
            ? {
                statusId: status,
              }
            : {}),
          ...(category
            ? {
                categoryId: category,
              }
            : {}),
          ...(search
            ? {
                [Op.or]: {
                  ...(search
                    ? {
                        name: {
                          [Op.like]: `%${search}%`,
                        },
                        description: {
                          [Op.like]: `%${search}%`,
                        },
                        title: {
                          [Op.like]: `%${search}%`,
                        },
                        subtitle: {
                          [Op.like]: `%${search}%`,
                        },
                      }
                    : {}),
                },
              }
            : {}),
          ...(start || end
            ? {
                created_at: {
                  [Op.and]: {
                    ...(end ? { [Op.lt]: end } : {}),
                    ...(start ? { [Op.gt]: start } : {}),
                  },
                },
              }
            : {}),
        },
      }

      const items = await Item.findAndCountAll({
        ...(page > 0 ? { offset: (page - 1) * limit, limit } : {}),
        include: this.getInclude(),
        where,
        order: [['updated_at', 'DESC']],
      })
      return res.json(
        new HttpResponse({
          data: {
            rows: items.rows,
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
      const item = await Item.findByPk(id, { include: this.getInclude() })
      return res.json(
        new HttpResponse({
          data: item,
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = this.getAttributeBody(req)
      const item = await Item.create(body, { include: this.getInclude() })
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
    const body = this.getAttributeBody(req)
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
      return res.status(422).json(new HttpException(422, 'Not found'))
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const { data } = await this.findOne(id)
      await data.destroy()
      return res.json(new HttpResponse({ data: true }).toJson())
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
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

  private getAttributeBody = (req: Request) => {
    return pick(req.body, [
      'name',
      'description',
      'statusId',
      'categoryId',
      'dynamic',
      'typeId',
      'title',
      'subtitle',
      'slug',
      'image',
      'images',
      'price',
    ])
  }
}
