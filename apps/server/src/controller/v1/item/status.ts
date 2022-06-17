import { ItemStatus } from '../../../db/models'

export class ItemStatusController {
  static findByPk = (id: string) => {
    return ItemStatus.findByPk(id)
  }

  static findAll = ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    return ItemStatus.findAndCountAll({ offset: (page - 1) * 10, limit })
  }

  static findOne = ItemStatus.findOne

  static update = async (id: number, body: Record<string, any>) => {
    return ItemStatus.update(body, { where: { id } })
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
}
