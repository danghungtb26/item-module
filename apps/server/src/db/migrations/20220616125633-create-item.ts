import { QueryInterface } from 'sequelize'
import { Sequelize, DataType } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.createTable('items', {
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
      supplier_id: {
        type: DataType.BIGINT,
      },
      status_id: {
        type: DataType.BIGINT,
        references: {
          model: 'item_statuses',
          key: 'id',
        },
      },
      category_id: {
        type: DataType.BIGINT,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      type_id: {
        type: DataType.BIGINT,
        references: {
          model: 'item_types',
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
    await queryInterface.dropTable('items')
  },
}
