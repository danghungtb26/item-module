import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    const statuses = ['New', 'Pending', 'Approved']
    await queryInterface.bulkInsert(
      'item_statuses',
      statuses.map(i => ({ name: i }))
    )
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('item_statuses', {})
  },
}
