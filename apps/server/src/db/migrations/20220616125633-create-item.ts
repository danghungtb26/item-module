import { QueryInterface } from 'sequelize'
import { Sequelize, DataType } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataType.TEXT,
        allowNull: false,
      },
      description: {
        type: DataType.TEXT,
      },
      slug: {
        type: DataType.STRING,
      },
      title: {
        type: DataType.STRING,
      },
      subtitle: {
        type: DataType.STRING,
      },
      image: {
        type: DataType.STRING,
      },
      images: {
        type: DataType.ARRAY(DataType.STRING),
        defaultValue: [],
      },
      price: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      supplierId: {
        type: DataType.BIGINT,
      },
      statusId: {
        type: DataType.BIGINT,
        references: {
          model: 'ItemStatuses',
          key: 'id',
        },
      },
      categoryId: {
        type: DataType.BIGINT,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      typeId: {
        type: DataType.BIGINT,
        references: {
          model: 'ItemTypes',
          key: 'id',
        },
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
    await queryInterface.dropTable('Items')
  },
}
