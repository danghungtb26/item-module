import { QueryInterface } from 'sequelize'
import { DataType, Sequelize } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.createTable('item_attribute_types', {
      id: {
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      item_type_id: {
        type: DataType.BIGINT,
        references: {
          model: 'item_types',
          key: 'id',
        },
      },
      attribute_id: {
        type: DataType.BIGINT,
        references: {
          model: 'item_attributes',
          key: 'id',
        },
      },
      order: {
        type: DataType.INTEGER,
        autoIncrement: true,
      },
      deleted_at: {
        type: DataType.DATE,
      },
      created_at: {
        type: DataType.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        type: DataType.DATE,
        defaultValue: new Date(),
      },
    })
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.dropTable('item_attribute_types', {})
  },
}
