import { Category } from '../../db/models'

export class CategoryController {
  static findByPk = (id: string) => {
    return Category.findByPk(id)
  }

  static findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
    page = 1,
    limit = 10,
  }) => {
    const categories = await Category.findAndCountAll({ offset: (page - 1) * 10, limit })
    return {
      data: categories.rows,
      paging: {
        current_page: page,
        limit,
        total_page: Math.ceil(categories.count / limit),
        total: categories.count,
      },
    }
  }

  static findOne = Category.findOne

  static update = async (id: number, body: Record<string, any>) => {
    return Category.update(body, { where: { id } })
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
    return Category.destroy({ where: { id } })
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
