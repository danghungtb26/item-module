import { Category, Item, ItemStatus, ItemType } from '../../../db/models'

export class ItemController {
  static findByPk = (id: string) => {
    return Item.findByPk(id)
  }

  static findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
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

  static findOne = async (id: number | string) => {
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

  static create = async (body: Record<string, any>) => {
    const item = await Item.create(body)
    if (item) {
      return {
        data: item,
      }
    }

    throw new Error('Item cannot create')
  }

  static update = async (id: number | string, body: Record<string, any>) => {
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

    throw new Error('Item cannot create')
  }

  static deleteByPk = async (id: string) => {
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

  static getInclude() {
    return [Category, ItemStatus, ItemType]
  }

  static getAttributes = () => {
    return Item.getAttributes()
  }

  static get attibutes() {
    return Item.attibutes
  }
}
