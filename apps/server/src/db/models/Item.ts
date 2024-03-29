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

@Table({ tableName: 'items', paranoid: true })
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

  @Column(DataType.JSONB)
  dynamic: Record<string, any>

  @Column(DataType.NUMBER)
  price: number

  @Column({ type: DataType.BIGINT, field: 'supplier_id' })
  supplierId: number

  @Column(DataType.INTEGER)
  override order: number

  @ForeignKey(() => ItemStatus)
  @Column({ type: DataType.BIGINT, field: 'status_id' })
  statusId: number

  @ForeignKey(() => Category)
  @Column({ type: DataType.BIGINT, field: 'category_id' })
  categoryId: number

  @ForeignKey(() => ItemType)
  @Column({ type: DataType.BIGINT, field: 'type_id' })
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

  toJson() {
    const dynamic =
      this.type?.filterAttributeDefault().reduce((a, b) => {
        return {
          ...a,
          [b.name]: this.dynamic?.[b.name] ?? '',
        }
      }, {}) ?? {}

    return {
      id: this.id,
      name: this.name,
      description: this.description,
      slug: this.slug,
      title: this.title,
      subtitle: this.subtitle,
      type: this.type,
      category: this.category,
      status: this.status,
      image: this.image,
      images: this.images,
      price: this.price,
      typeId: this.typeId,
      categoryId: this.categoryId,
      statusId: this.statusId,
      order: this.order,
      // @ts-ignore
      created_at: this.created_at,
      // @ts-ignore
      updated_at: this.updated_at,
      ...dynamic,
    }
  }
}
