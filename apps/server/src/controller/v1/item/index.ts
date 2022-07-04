import { injectable } from 'inversify'
import { Category, Item, ItemStatus, ItemType } from '../../../db/models'

@injectable()
export class ItemController {
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
      include: [Category, ItemStatus, ItemType],
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

  create = async (body: Record<string, any>) => {
    const item = await Item.create(body)
    if (item) {
      return {
        data: item,
      }
    }

    throw new Error('Item cannot create')
  }

  update = async (id: number | string, body: Record<string, any>) => {
    const item = await Item.findOne({
      where: {
        id,
      },
    })

    if (item) {
      await Item.update(body, { where: { id } })
      const item = await Item.findOne({ where: { id }, include: this.getInclude() })
      return {
        data: item,
      }
    }

    throw new Error('Cannot update')
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

  getAttributes = () => {
    return Item.getAttributes()
  }

  get attributes() {
    return Item.attributes
  }
}
