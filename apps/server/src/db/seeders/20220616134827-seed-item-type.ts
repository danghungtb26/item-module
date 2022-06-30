import '..'
import { QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { ItemType } from '../models/ItemType'
import { Item } from '../models'

export default {
  up: async (_queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await ItemType.create({ name: 'Type 1', includes: Item.attributes })
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('ItemTypes', {})
  },
}
