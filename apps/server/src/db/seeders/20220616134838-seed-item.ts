import { QueryInterface, QueryTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { faker } from '@faker-js/faker'

export default {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    const categories: any[] = await queryInterface.sequelize.query('SELECT * FROM "categories" ', {
      type: QueryTypes.SELECT,
    })

    const statuses: any[] = await queryInterface.sequelize.query('SELECT * FROM "item_statuses" ', {
      type: QueryTypes.SELECT,
    })
    const types: any[] = await queryInterface.sequelize.query('SELECT * FROM "item_types"', {
      type: QueryTypes.SELECT,
    })

    const items = Array.from({ length: 15 }).map(_ => ({
      name: faker.word.noun(40),
      description: faker.lorem.text(),
      slug: faker.lorem.slug(4),
      title: faker.word.noun(40),
      image: faker.image.imageUrl(),
      status_id: statuses[0]?.id,
      type_id: types[0]?.id,
      category_id: categories?.[0].id,
    }))
    await queryInterface.bulkInsert('items', items)
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('items', {})
  },
}
