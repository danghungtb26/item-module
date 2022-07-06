import { QueryInterface } from 'sequelize'
import { DataType, Sequelize } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.createTable('item_attributes', {
      id: {
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataType.TEXT,
      },
      value_type: {
        type: DataType.ENUM('string', 'number', 'boolean', 'array', 'json'),
        defaultValue: 'string',
      },
      required: {
        type: DataType.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('item_attributes', {})
  },
}
