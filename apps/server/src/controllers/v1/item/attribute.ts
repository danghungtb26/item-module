import { Attribute } from '@db/models'
import { HttpException } from '@exceptions/HttpException'
import { HttpResponse } from '@responses/HttpResponse'
import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { pick } from '@utils/lodash'
import { Op } from 'sequelize'

@injectable()
export class AttributeController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const { start, end, search } = pick(req.query ?? {}, ['start', 'end', 'search'])
      const attributes = await Attribute.findAndCountAll({
        ...(page > 0 ? { offset: (page - 1) * limit, limit } : {}),
        order: [['updated_at', 'DESC']],
        where: {
          [Op.and]: {
            ...(search
              ? {
                  [Op.or]: {
                    name: {
                      [Op.like]: `%${search}%`,
                    },
                    description: {
                      [Op.like]: `%${search}%`,
                    },
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
        },
      })
      return res.json(
        new HttpResponse({
          data: {
            rows: attributes.rows.map(i => i.toJSON()),
            paging: {
              current_page: page,
              limit,
              total_page: Math.ceil(attributes.count / limit),
              total: attributes.count,
            },
          },
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = this.getAttributeBody(req)
      const attribute = await Attribute.create(body)
      return res.json(
        new HttpResponse({
          data: attribute,
        }).toJson()
      )
    } catch (error: any) {
      return next(new HttpException(500, error.message))
    }
  }

  private getAttributeBody = (req: Request) => {
    return pick(req.body, ['name', 'description'])
  }
}
