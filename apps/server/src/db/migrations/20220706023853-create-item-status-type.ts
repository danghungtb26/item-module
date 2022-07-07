import { QueryInterface } from 'sequelize'
import { Sequelize, DataType } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.createTable('item_status_types', {
      id: {
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      item_type_id: {
        type: DataType.BIGINT,
        allowNull: false,
        references: {
          model: 'item_types',
          key: 'id',
        },
      },
      status_id: {
        type: DataType.BIGINT,
        allowNull: false,
        references: {
          model: 'item_statuses',
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
  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.dropTable('item_status_types')
  },
}
