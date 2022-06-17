import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class Base extends Model {
  @Column(DataType.INTEGER)
  order: number

  upsert(options: Record<string, any>) {
    const keys = Object.keys(options)
    keys.forEach(i => {
      if (this.getAttributes().includes(i)) {
        this.setDataValue(i, options[i])
      }
    })
  }

  getAttributes(): string[] {
    return []
  }
}
