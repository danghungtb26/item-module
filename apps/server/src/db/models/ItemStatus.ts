import { Column, DataType, NotEmpty, NotNull, Table } from 'sequelize-typescript'
import { Base } from './base'

@Table({ tableName: 'ItemStatuses', modelName: 'ItemStatuses' })
export class ItemStatus extends Base {
  @NotEmpty
  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  description: string

  @Column(DataType.INTEGER)
  override order: number
}
