import { QueryInterface } from 'sequelize'
import { Sequelize, DataType } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      parent_id: {
        type: DataType.BIGINT,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataType.STRING,
      },
      sub_category_count: {
        type: DataType.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('categories')
  },
}
