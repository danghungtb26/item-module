import { QueryInterface } from 'sequelize'
import { Sequelize, DataType } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.createTable('ItemTypes', {
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
      order: {
        type: DataType.INTEGER,
        autoIncrement: true,
      },
      includes: {
        type: DataType.ARRAY(DataType.STRING),
        defaultValue: [],
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
    await queryInterface.dropTable('ItemTypes')
  },
}
