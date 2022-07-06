import { BelongsToMany, Column, DataType, HasMany, NotEmpty, Table } from 'sequelize-typescript'
import { Attribute } from './Attribute'
import { AttributeType } from './AttributeType'
import { Base } from './base'
import { ItemStatus } from './ItemStatus'
import { StatusType } from './StatusType'

@Table({ tableName: 'item_types' })
export class ItemType extends Base {
  @NotEmpty
  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  description: string

  @HasMany(() => AttributeType, { as: 'attributeTypes' })
  attributeTypes: AttributeType[]

  @BelongsToMany(() => Attribute, {
    as: 'attributes',
    through: () => AttributeType,
  })
  attributes: Attribute[]

  @HasMany(() => StatusType, { as: 'statusTypes' })
  statusTypes: StatusType[]

  @BelongsToMany(() => ItemStatus, {
    as: 'statuses',
    through: () => StatusType,
  })
  statuses: ItemStatus[]
}
