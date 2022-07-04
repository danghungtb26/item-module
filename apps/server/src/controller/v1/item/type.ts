import { injectable } from 'inversify'
import { ItemType } from '../../../db/models'

@injectable()
export class ItemTypeController {
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

  create = async (body: Record<string, any>) => {
    const status = await ItemType.create(body)
    if (status) {
      return {
        data: status,
      }
    }

    throw new Error('Cannot create')
  }

  update = async (id: number | string, body: Record<string, any>) => {
    const status = await ItemType.findOne({
      where: {
        id,
      },
    })

    if (status) {
      await ItemType.update(body, { where: { id } })
      const status = await ItemType.findOne({ where: { id } })
      return {
        data: status,
      }
    }

    throw new Error('Cannot update')
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
