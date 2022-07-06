import { BelongsToMany, Column, DataType, HasMany, NotEmpty, Table } from 'sequelize-typescript'
import { Base } from './base'
import { ItemType } from './ItemType'
import { StatusType } from './StatusType'

@Table({ tableName: 'item_statuses' })
export class ItemStatus extends Base {
  @NotEmpty
  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  description: string

  @HasMany(() => StatusType, { as: 'statusTypes' })
  statusTypes: StatusType[]

  @BelongsToMany(() => ItemType, {
    as: 'types',
    through: () => StatusType,
  })
  types: ItemType[]
}
