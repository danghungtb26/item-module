import { Sequelize } from 'sequelize-typescript'
import Config from './config'
import * as Models from './models'

const env = process.env.NODE_ENV || 'development'

export default new Sequelize(
  // @ts-ignore
  Config[env].database ?? '',
  // @ts-ignore
  Config[env].username ?? '',
  // @ts-ignore
  Config[env].password ?? '',
  // @ts-ignore
  {
    // @ts-ignore
    ...Config[env],
    models: Object.values(Models),
  }
)
