import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    const attributes = [
      { name: 'name', value_type: 'string' },
      { name: 'description', value_type: 'string' },
      { name: 'slug', value_type: 'string' },
      { name: 'title', value_type: 'string' },
      { name: 'subtitle', value_type: 'string' },
      { name: 'image', value_type: 'string' },
      { name: 'images', value_type: 'array' },
      { name: 'price', value_type: 'number' },
    ]
    await queryInterface.bulkInsert('item_attributes', attributes)
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('item_attributes', {})
  },
}
