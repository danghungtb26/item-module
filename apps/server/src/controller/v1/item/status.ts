import { injectable } from 'inversify'
import { ItemStatus } from '../../../db/models'

@injectable()
export class ItemStatusController {
  findByPk = (id: string) => {
    return ItemStatus.findByPk(id)
  }

  findAll: (p: { page?: number; limit?: number }) => Promise<API.V1.Response> = async ({
    page = 1,
    limit = 10,
  }) => {
    const items = await ItemStatus.findAndCountAll({
      offset: (page - 1) * 10,
      limit,
      order: ['order', 'DESC'],
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
    const status = await ItemStatus.findOne({
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
    const status = await ItemStatus.create(body)
    if (status) {
      return {
        data: status,
      }
    }

    throw new Error('Cannot create')
  }

  update = async (id: number | string, body: Record<string, any>) => {
    const status = await ItemStatus.findOne({
      where: {
        id,
      },
    })

    if (status) {
      await ItemStatus.update(body, { where: { id } })
      const status = await ItemStatus.findOne({ where: { id } })
      return {
        data: status,
      }
    }

    throw new Error('Cannot update')
  }

  deleteByPk = async (id: string) => {
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

  wrapOrder = async (start: string | number, end: string | number) => {
    const [startStatus, endStatus] = await Promise.all([
      ItemStatus.findByPk(start),
      ItemStatus.findByPk(end),
    ])
    if (!startStatus || !endStatus) {
      throw new Error('Status not found')
    }

    const transaction = await ItemStatus.sequelize?.transaction()
    try {
      await Promise.all([
        ItemStatus.update(
          { order: endStatus.order },
          {
            where: {
              id: start,
            },
            transaction,
          }
        ),
        ItemStatus.update(
          { order: startStatus.order },
          {
            where: {
              id: end,
            },
            transaction,
          }
        ),
      ])
      const [newStart, newEnd] = await Promise.all([
        ItemStatus.findByPk(start),
        ItemStatus.findByPk(end),
      ])
      await transaction?.commit()
      return {
        data: {
          start: newStart,
          end: newEnd,
        },
      }
    } catch (error) {
      await transaction?.rollback()
      throw new Error('Server error')
    }
  }
}
