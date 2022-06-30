import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  // NotEmpty,
  // NotNull,
  Table,
} from 'sequelize-typescript'
import { Base } from './base'
import { ItemStatus, Category, ItemType } from '.'

@Table({ tableName: 'Items', modelName: 'Items' })
export class Item extends Base {
  // @NotEmpty
  // @NotNull
  @Column(DataType.TEXT)
  name: string

  @Column(DataType.TEXT)
  description: string

  @Column(DataType.STRING)
  slug: string

  @Column(DataType.STRING)
  title: string

  @Column(DataType.STRING)
  subtitle: string

  @Column(DataType.STRING)
  image: string

  @Column(DataType.ARRAY(DataType.STRING))
  images: string[]

  @Column(DataType.NUMBER)
  price: number

  @Column(DataType.BIGINT)
  supplierId: number

  @Column(DataType.INTEGER)
  override order: number

  @ForeignKey(() => ItemStatus)
  @Column(DataType.BIGINT)
  statusId: number

  @ForeignKey(() => Category)
  categoryId: number

  @ForeignKey(() => ItemType)
  typeId: number

  @BelongsTo(() => Category)
  category: Category

  @BelongsTo(() => ItemStatus)
  status: ItemStatus

  @BelongsTo(() => ItemType)
  type: ItemType

  override getAttributes() {
    return Item.attributes
  }

  static get attributes() {
    return Object.keys(this.getAttributes()).filter(
      i => i !== 'order' && !i.toLowerCase().includes('id') && !i.toLowerCase().includes('at')
    )
  }
}
