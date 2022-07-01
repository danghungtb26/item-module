import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  underscored: true,
})
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
