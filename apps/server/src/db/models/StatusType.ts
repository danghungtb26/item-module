import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { Base } from './base'
import { ItemStatus } from './ItemStatus'
import { ItemType } from './ItemType'

@Table({ tableName: 'item_status_types' })
export class StatusType extends Base {
  @ForeignKey(() => ItemStatus)
  @Column({ type: DataType.BIGINT, field: 'status_id' })
  statusId: number

  @ForeignKey(() => ItemType)
  @Column({ type: DataType.BIGINT, field: 'item_type_id' })
  itemTypeId: number

  @BelongsTo(() => ItemStatus)
  status: ItemStatus

  @BelongsTo(() => ItemType)
  itemType: ItemType
}
