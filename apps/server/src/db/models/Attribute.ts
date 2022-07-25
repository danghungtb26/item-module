import { BelongsToMany, Column, DataType, HasMany, NotEmpty, Table } from 'sequelize-typescript'
import { AttributeType } from './AttributeType'
import { Base } from './base'
import { ItemType } from './ItemType'

@Table({ tableName: 'item_attributes' })
export class Attribute extends Base {
  @NotEmpty
  @Column(DataType.TEXT)
  name: string

  @Column(DataType.TEXT)
  description: string

  @Column({
    type: DataType.ENUM('string', 'number', 'boolean', 'array', 'json'),
    field: 'value_type',
  })
  valueType: 'string' | 'number' | 'boolean' | 'array' | 'json'

  @Column(DataType.BOOLEAN)
  required: boolean

  @HasMany(() => AttributeType, { as: 'attributeTypes' })
  attributeTypes: AttributeType[]

  @BelongsToMany(() => ItemType, {
    as: 'types',
    through: () => AttributeType,
  })
  types: ItemType[]
}
