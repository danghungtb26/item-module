// @ts-ignore
module.exports = {
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    options: {
      dialectModule: require('pg'),
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeeder',
  },
  development: {
    username: process.env.POSTGRES_USERNAME || 'item',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DATABASE || 'item',
    host: process.env.POSTGRES_HOSTNAME || 'localhost',
    dialect: 'postgres',
    options: {
      dialectModule: require('pg'),
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeeder',
  },
  staging: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    options: {
      dialectModule: require('pg'),
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeeder',
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    options: {
      dialectModule: require('pg'),
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeSeeder',
  },
}
