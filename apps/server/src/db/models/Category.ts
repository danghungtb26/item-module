import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  NotEmpty,
  Scopes,
  Table,
} from 'sequelize-typescript'
import { Base } from './base'

@Table({ tableName: 'categories', modelName: 'categories' })
@Scopes({
  haveNotParent: {
    where: { parentId: null },
  },
})
export class Category extends Base {
  @NotEmpty
  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  description: string

  @Column(DataType.INTEGER)
  override order: number

  @ForeignKey(() => Category)
  @Column({ type: DataType.BIGINT, field: 'parent_id' })
  parentId: number

  @Column({ type: DataType.INTEGER, field: 'sub_category_count' })
  subCategoryCount: number

  @HasMany(() => Category)
  categories: Category[]

  @BelongsTo(() => Category)
  parent: Category
}
