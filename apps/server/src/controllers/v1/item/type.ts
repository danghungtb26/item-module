import { HttpException } from '@exceptions/HttpException'
import { HttpResponse } from '@responses/HttpResponse'
import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { Attribute, ItemStatus, ItemType } from '@db/models'
import { Transaction } from 'sequelize'
import db from '@db'
import { isUndefined } from 'lodash'

@injectable()
export class ItemTypeController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const types = await ItemType.findAndCountAll({
        offset: (page - 1) * 10,
        limit,
        include: [
          {
            model: Attribute,
            through: { attributes: [] },
          },
          {
            model: ItemStatus,
            through: { attributes: [] },
          },
        ],
        order: [['updated_at', 'DESC']],
        distinct: true,
      })
      return res.json(
        new HttpResponse<API.V1.ResponseList>({
          data: {
            rows: types.rows.map(i => i.toJSON()),
            paging: {
              current_page: page,
              limit,
              total_page: Math.ceil(types.count / limit),
              total: types.count,
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
          data: ItemType.findByPk(id),
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
      const body = {
        name: req.body.name,
        description: req.body.description,
      }

      const type = await ItemType.create(body, { transaction })

      // @ts-ignore
      await type.setAttribute(req.body.attributes, { transaction })

      // @ts-ignore
      await type.setStatuses(req.body.statuses, { transaction })
      // await AttributeType.bulkCreate(
      //   req.body.attributes.map((i: number) => ({
      //     attributeId: i,
      //     itemTypeId: type.id,
      //   })),
      //   { transaction }
      // )

      // await StatusType.bulkCreate(
      //   req.body.statuses.map((i: number) => ({
      //     statusId: i,
      //     itemTypeId: type.id,
      //   })),
      //   { transaction }
      // )

      const newType = await this.findByPk(type.id, { transaction })
      await transaction?.commit()
      return res.json(
        new HttpResponse({
          data: newType,
        }).toJson()
      )
    } catch (error: any) {
      transaction?.rollback()
      return next(new HttpException(500, error.message))
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    let transaction: Transaction | undefined

    try {
      transaction = await db.transaction()

      const { name, description, statuses, attributes } = req.body

      const body: Record<string, any> = {}
      if (!isUndefined(name)) {
        body.name = name
      }

      if (!isUndefined(description)) {
        body.description = description
      }

      const type = await ItemType.findOne({
        where: {
          id,
        },
      })

      if (!isUndefined(statuses)) {
        // @ts-ignore
        await type?.setStatuses(statuses, { transaction })
      }

      if (!isUndefined(attributes)) {
        // @ts-ignore
        await type?.setAttribute(attributes, { transaction })
      }

      if (type) {
        await ItemType.update(req.body, { where: { id } })
        const newType = await this.findByPk(id, { transaction })
        await transaction.commit()
        return res.json(
          new HttpResponse({
            data: newType,
          })
        )
      }
      throw new Error('Not found')
    } catch (error: any) {
      await transaction?.rollback()
      return next(new HttpException(500, error.message))
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return ItemType.destroy({ where: { id: req.params.id } })
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

  findByPk = async (id: string, options?: Parameters<typeof ItemType['findByPk']>[1]) => {
    const type = await ItemType.findByPk(id, {
      include: [
        {
          model: Attribute,
          through: { as: 'more', attributes: ['id'] },
        },
        {
          model: ItemStatus,
          through: { as: 'more', attributes: ['id'] },
        },
      ],
      ...options,
    })
    if (type) {
      return type
    }

    throw new Error('Not found')
  }

  findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
    page = 1,
    limit = 10,
  }) => {
    const items = await ItemType.findAndCountAll({
      offset: (page - 1) * 10,
      limit,
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
    const status = await ItemType.findOne({
      where: {
        id,
      },
    })
    if (status) {
      return {
        data: status,
      }
    }

    throw new Error('Not found')
  }

  deleteByPk = async (id: string) => {
    return ItemType.destroy({ where: { id } })
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
