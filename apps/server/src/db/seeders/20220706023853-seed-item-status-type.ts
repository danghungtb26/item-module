import { QueryInterface, QueryTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    const statuses: any[] = await queryInterface.sequelize.query('SELECT * FROM "item_statuses" ', {
      type: QueryTypes.SELECT,
    })
    const types: any[] = await queryInterface.sequelize.query('SELECT * FROM "item_types"', {
      type: QueryTypes.SELECT,
    })

    if (types.length === 0 || statuses.length === 0) return

    await queryInterface.bulkInsert(
      'item_status_types',
      statuses.map(i => ({ status_id: i.id, item_type_id: types[0].id }))
    )
  },

  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    await queryInterface.bulkDelete('item_status_types', {})
  },
}
