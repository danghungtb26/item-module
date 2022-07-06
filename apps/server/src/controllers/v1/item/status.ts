import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { ItemStatus } from '@db/models'
import { HttpResponse } from '@responses/HttpResponse'
import { HttpException } from '@exceptions/HttpException'
import { Transaction } from 'sequelize/types'

@injectable()
export class ItemStatusController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const statuses = await ItemStatus.findAndCountAll({
        offset: (page - 1) * 10,
        limit,
      })
      return res.json(
        new HttpResponse<API.V1.ResponseList>({
          data: {
            rows: statuses.rows.map(i => i.toJSON()),
            paging: {
              current_page: page,
              limit,
              total_page: Math.ceil(statuses.count / limit),
              total: statuses.count,
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
          data: ItemStatus.findByPk(id),
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await ItemStatus.create(req.body)
      return res.json(
        new HttpResponse({
          data: status,
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
      const status = await ItemStatus.findOne({
        where: {
          id,
        },
      })

      if (status) {
        await ItemStatus.update(body, { where: { id } })
        const status = await ItemStatus.findOne({ where: { id } })
        return res.json(
          new HttpResponse({
            data: status,
          })
        )
      }
      throw new Error('Not found')
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return ItemStatus.destroy({ where: { id: req.params.id } })
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
    return ItemStatus.findByPk(id)
  }

  findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
    page = 1,
    limit = 10,
  }) => {
    const items = await ItemStatus.findAndCountAll({
      offset: (page - 1) * 10,
      limit,
      order: ['order', 'DESC'],
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
    const status = await ItemStatus.findOne({
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
    return ItemStatus.destroy({ where: { id } })
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

  swapOrder = async (req: Request, res: Response, next: NextFunction) => {
    let transaction: Transaction | undefined
    try {
      transaction = await ItemStatus.sequelize?.transaction()

      const start = Number(req.body.start)
      const end = Number(req.body.end)

      const [startStatus, endStatus] = await Promise.all([
        ItemStatus.findByPk(start),
        ItemStatus.findByPk(end),
      ])

      if (!startStatus || !endStatus) {
        throw new Error('Status not found')
      }

      await Promise.all([
        ItemStatus.update(
          { order: endStatus.order },
          {
            where: {
              id: start,
            },
            transaction,
          }
        ),
        ItemStatus.update(
          { order: startStatus.order },
          {
            where: {
              id: end,
            },
            transaction,
          }
        ),
      ])

      const [newStart, newEnd] = await Promise.all([
        ItemStatus.findByPk(start),
        ItemStatus.findByPk(end),
      ])

      await transaction?.commit()

      return res.json(
        new HttpResponse({
          data: {
            start: newStart,
            end: newEnd,
          },
        })
      )
    } catch (error: any) {
      await transaction?.rollback()
      return next(new HttpException(500, error.message))
    }
  }
}
