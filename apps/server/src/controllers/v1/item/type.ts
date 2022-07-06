import { HttpException } from '@exceptions/HttpException'
import { HttpResponse } from '@responses/HttpResponse'
import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { Attribute, ItemType } from '@db/models'

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
        ],
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
    try {
      const type = await ItemType.create(req.body)
      return res.json(
        new HttpResponse({
          data: type,
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
      const type = await ItemType.findOne({
        where: {
          id,
        },
      })

      if (type) {
        await ItemType.update(body, { where: { id } })
        const type = await ItemType.findOne({ where: { id } })
        return res.json(
          new HttpResponse({
            data: type,
          })
        )
      }
      throw new Error('Not found')
    } catch (error: any) {
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

  findByPk = async (id: string) => {
    const type = await ItemType.findByPk(id)
    if (type) {
      return {
        data: type,
      }
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
