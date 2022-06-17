import '..'
import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'
import { Category, Item, ItemStatus, ItemType } from '../models'

export default {
  up: async (_queryInterface: QueryInterface, _sequelize: Sequelize) => {
    const status = await ItemStatus.findOne()
    const type = await ItemType.findOne()

    const category = await Category.findOne()

    const items = Array.from({ length: 15 }).map(_ => ({
      name: faker.word.noun(40),
      description: faker.lorem.text(),
      slug: faker.lorem.slug(4),
      title: faker.word.noun(40),
      image: faker.image.imageUrl(),
      statusId: status?.id,
      typeId: type?.id,
      categoryId: category?.id,
    }))
    await Promise.all(
      items.map(async e => {
        await Item.create(e)
      })
    )
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('Items', {})
  },
}
