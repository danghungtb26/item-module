import { Attribute } from '@db/models'
import { HttpException } from '@exceptions/HttpException'
import { HttpResponse } from '@responses/HttpResponse'
import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { pick } from '@utils/lodash'

@injectable()
export class AttributeController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page) ?? '', 10) || 1
      const limit = parseInt(String(req.query.limit) ?? '', 10) || 10
      const attributes = await Attribute.findAndCountAll({
        offset: (page - 1) * 10,
        limit,
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
