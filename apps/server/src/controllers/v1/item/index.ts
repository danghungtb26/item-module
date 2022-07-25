import { injectable } from 'inversify'
import { Attribute, Category, Item, ItemStatus, ItemType } from '@db/models'
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
            rows: items.rows.map(i => i.toJson()),
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
          data: item?.toJson(),
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = this.getAttributeBody(req)
      const type = await ItemType.findByPk(body.typeId, {
        include: [
          {
            model: Attribute,
            through: {
              attributes: [],
            },
          },
        ],
      })

      const attributes = type?.filterAttributeDefault() ?? []

      const dynamic: Record<string, any> = {}

      const dynamicBody = pick(
        req.body,
        attributes.map(i => i.name)
      )
      let check = false
      attributes.forEach(element => {
        // @ts-ignore
        const value = dynamicBody[element.name]

        if (element.required && !value) {
          res
            .status(422)
            .json(new HttpResponse({ status: 422, message: `Missing parameter ${element.name}` }))
          check = true
        }

        if (!this.checkCorrectType(value, element.valueType)) {
          res
            .status(422)
            .json(new HttpResponse({ status: 422, message: `Wrong parameter ${element.name}` }))
          check = true
        }

        // validate
        dynamic[element.name] = value
        console.log('🚀 ~ file: index.ts ~ line 155 ~ ItemController ~ create= ~ dynamic', dynamic)
      })
      if (check) return res

      const item = await Item.create({ ...body, dynamic }, { include: this.getInclude() })
      return res.json(
        new HttpResponse({
          data: (await Item.findByPk(item.id, { include: this.getInclude() }))?.toJson(),
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
        const type = await ItemType.findByPk(body.typeId || item?.typeId, {
          include: [
            {
              model: Attribute,
              through: {
                attributes: [],
              },
            },
          ],
        })

        const attributes = type?.filterAttributeDefault() ?? []

        const dynamic: Record<string, any> = {}

        const dynamicBody = pick(
          req.body,
          attributes.map(i => i.name)
        )
        let check = false
        attributes.forEach(element => {
          // @ts-ignore
          const value = dynamicBody[element.name]

          if (element.required && !value) {
            res
              .status(422)
              .json(new HttpResponse({ status: 422, message: `Missing parameter ${element.name}` }))
            check = true
          }

          if (!this.checkCorrectType(value, element.valueType)) {
            res
              .status(422)
              .json(new HttpResponse({ status: 422, message: `Wrong parameter ${element.name}` }))
            check = true
          }

          // validate
          dynamic[element.name] = value
        })
        if (check) return res

        await Item.update(
          {
            ...body,

            dynamic: {
              ...item.dynamic,
              ...dynamic,
            },
          },
          { where: { id } }
        )
        const item2 = await Item.findOne({ where: { id }, include: this.getInclude() })

        return res.json(
          new HttpResponse({
            data: item2?.toJson(),
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
    return [
      Category,
      ItemStatus,
      {
        model: ItemType,

        include: [
          {
            model: Attribute,
            through: { attributes: [] },
          },
        ],
      },
    ]
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
      'typeId',
      'title',
      'subtitle',
      'slug',
      'image',
      'images',
      'price',
    ])
  }

  private checkCorrectType = (
    value: any,
    type: 'string' | 'number' | 'boolean' | 'array' | 'json'
  ) => {
    if (value === null || value === undefined) return true
    switch (type) {
      case 'string':
        return typeof `${value}` === 'string'

      case 'number':
        return /^-?[\d]{1,}/.test(`${value}`)

      case 'boolean':
        return /true|false/.test(`${value}`)

      case 'array':
        return Array.isArray(value)

      case 'json':
        return true

      default:
        return false
    }
  }
}
