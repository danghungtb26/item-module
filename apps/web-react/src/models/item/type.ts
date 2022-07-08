import { BaseClass } from '@models/base'

export class ItemType extends BaseClass implements Item.TypeInterface {
  name: string

  description: string

  slug: string

  attach_to_sidebar?: boolean | undefined

  attribute: Item.AttributeInterface[]

  statuses: Item.StatusInterface[]

  static fromJson(json: any): ItemType {
    return new ItemType(json)
  }
}
