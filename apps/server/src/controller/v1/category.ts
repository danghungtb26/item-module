import { injectable } from 'inversify'
import { Category } from '@db/models'

@injectable()
export class CategoryController {
  findByPk = (id: string) => {
    return Category.findByPk(id)
  }

  findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
    page = 1,
    limit = 10,
  }) => {
    const categories = await Category.findAndCountAll({
      offset: (page - 1) * 10,
      limit,
    })
    return {
      data: categories.rows.map(i => i.toJSON()),
      paging: {
        current_page: page,
        limit,
        total_page: Math.ceil(categories.count / limit),
        total: categories.count,
      },
    }
  }

  findOne = async (id: number | string) => {
    const category = await Category.findOne({
      where: {
        id,
      },
    })
    if (category) {
      return {
        data: category,
      }
    }

    throw new Error('Not found')
  }

  create = async (body: Record<string, any>) => {
    const category = await Category.create(body)
    if (category) {
      return {
        data: category,
      }
    }

    throw new Error('Cannot create')
  }

  update = async (id: number | string, body: Record<string, any>) => {
    const category = await Category.findOne({
      where: {
        id,
      },
    })

    if (category) {
      await Category.update(body, { where: { id } })
      const category = await Category.findOne({ where: { id } })
      return {
        data: category,
      }
    }

    throw new Error('Cannot update')
  }

  deleteByPk = async (id: string) => {
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
