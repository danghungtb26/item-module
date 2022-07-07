import { BelongsTo, Column, DataType, ForeignKey, NotNull, Table } from 'sequelize-typescript'
import { Base } from './base'
import { ItemStatus } from './ItemStatus'
import { ItemType } from './ItemType'

@Table({ tableName: 'item_status_types' })
export class StatusType extends Base {
  @NotNull
  @ForeignKey(() => ItemStatus)
  @Column({ type: DataType.BIGINT, field: 'status_id', allowNull: false })
  statusId: number

  @NotNull
  @ForeignKey(() => ItemType)
  @Column({ type: DataType.BIGINT, field: 'item_type_id', allowNull: false })
  itemTypeId: number

  @BelongsTo(() => ItemStatus)
  status: ItemStatus

  @BelongsTo(() => ItemType)
  itemType: ItemType
}
