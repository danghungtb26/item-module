import '..'
import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { ItemStatus } from '../models'

export default {
  up: async (_queryInterface: QueryInterface, _sequelize: Sequelize) => {
    const statuses = ['New', 'Pending', 'Approved']
    statuses.forEach(async element => {
      await ItemStatus.create({ name: element })
    })
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('ItemStatuses', {})
  },
}
