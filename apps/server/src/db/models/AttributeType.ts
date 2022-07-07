import { BelongsTo, Column, DataType, ForeignKey, NotNull, Table } from 'sequelize-typescript'
import { Attribute } from './Attribute'
import { Base } from './base'
import { ItemType } from './ItemType'

@Table({ tableName: 'item_attribute_types' })
export class AttributeType extends Base {
  @NotNull
  @ForeignKey(() => Attribute)
  @Column({ type: DataType.BIGINT, field: 'attribute_id', allowNull: false })
  attributeId: number

  @NotNull
  @ForeignKey(() => ItemType)
  @Column({ type: DataType.BIGINT, field: 'item_type_id', allowNull: false })
  itemTypeId: number

  @BelongsTo(() => Attribute)
  attribute: Attribute

  @BelongsTo(() => ItemType)
  itemType: ItemType
}
