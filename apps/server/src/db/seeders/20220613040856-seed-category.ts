import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Category 1',
      },
    ])
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('categories', {})
  },
}
