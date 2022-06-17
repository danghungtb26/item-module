import { ItemType } from '../../../db/models'

export class ItemTypeController {
  static findByPk = (id: string) => {
    return ItemType.findByPk(id)
  }

  static findAll = ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    return ItemType.findAndCountAll({ offset: (page - 1) * 10, limit })
  }

  static findOne = ItemType.findOne

  static update = async (id: number, body: Record<string, any>) => {
    return ItemType.update(body, { where: { id } })
      .then(num => {
        if (num.length > 0) {
          return true
        }

        return false
      })
      .catch(() => {
        return false
      })
  }

  static deleteByPk = async (id: string) => {
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
