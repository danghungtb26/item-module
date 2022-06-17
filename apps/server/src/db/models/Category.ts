import {
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  NotEmpty,
  NotNull,
  Table,
} from 'sequelize-typescript'
import { Base } from './base'

@Table({ tableName: 'Categories', modelName: 'Categories' })
export class Category extends Base {
  @NotEmpty
  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  description: string

  @Column(DataType.INTEGER)
  override order: number

  @ForeignKey(() => Category)
  @Column(DataType.BIGINT)
  parentId: number

  @Column(DataType.INTEGER)
  subCategoryCount: number

  @HasMany(() => Category)
  categories: Category[]

  @BelongsTo(() => Category)
  parent: Category
}
