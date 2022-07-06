import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { Attribute } from './Attribute'
import { Base } from './base'
import { ItemType } from './ItemType'

@Table({ tableName: 'item_attribute_types' })
export class AttributeType extends Base {
  @ForeignKey(() => Attribute)
  @Column({ type: DataType.BIGINT, field: 'attribute_id' })
  attributeId: number

  @ForeignKey(() => ItemType)
  @Column({ type: DataType.BIGINT, field: 'item_type_id' })
  itemTypeId: number

  @BelongsTo(() => Attribute)
  attribute: Attribute

  @BelongsTo(() => ItemType)
  itemType: ItemType
}
