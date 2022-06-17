import '..'
import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Category } from '../models'

export default {
  up: async (_queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await Category.create({ name: 'Category 1' })
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('Categories', {})
  },
}
