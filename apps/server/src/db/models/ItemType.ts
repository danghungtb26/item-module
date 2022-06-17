import { Column, DataType, NotEmpty, Table } from 'sequelize-typescript'
import { Base } from './base'

@Table({ tableName: 'ItemTypes', modelName: 'ItemTypes' })
export class ItemType extends Base {
  @NotEmpty
  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  description: string

  @Column(DataType.ARRAY(DataType.STRING))
  includes: string[]
}
