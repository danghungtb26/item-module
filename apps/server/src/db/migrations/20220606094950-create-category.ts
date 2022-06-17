import { QueryInterface } from 'sequelize'
import { Sequelize, DataType } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      parentId: {
        type: DataType.BIGINT,
        references: {
          model: 'Categories',
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
      subCategoryCount: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      order: {
        type: DataType.INTEGER,
        autoIncrement: true,
      },
      deletedAt: {
        type: DataType.DATE,
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: false,
      },
    })
  },
  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.dropTable('Categories')
  },
}
