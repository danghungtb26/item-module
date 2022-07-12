import { BaseClass } from '@models/base'
import { ItemAttribute } from './attribute'
import { ItemStatus } from './status'

export class ItemType extends BaseClass implements Item.TypeInterface {
  name: string

  description: string

  slug: string

  attach_to_sidebar?: boolean | undefined

  attribute: Item.AttributeInterface[]

  statuses: Item.StatusInterface[]

  constructor(json: any) {
    super(json)
    const keys = Object.keys(json)
    keys.forEach(key => {
      switch (key) {
        case 'attribute':
          this.attribute = json[key]?.map(i => ItemAttribute.fromJson(i))
          break
        case 'statuses':
          this.statuses = json[key]?.map(i => ItemStatus.fromJson(i))
          break
        default:
          this[key] = json[key]

          break
      }
    })
  }

  static fromJson(json: any): ItemType {
    return new ItemType(json)
  }
}
