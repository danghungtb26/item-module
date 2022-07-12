import { BaseClass } from '@models/base'

export class ItemAttribute extends BaseClass implements Item.AttributeInterface {
  required?: boolean | undefined

  valueType: 'string' | 'number' | 'boolean' | 'array' | 'json'

  name: string

  description: string

  constructor(json: any) {
    super(json)
    const keys = Object.keys(json)
    keys.forEach(key => {
      this[key] = json[key]
    })
  }

  static fromJson(json: any): ItemAttribute {
    return new ItemAttribute(json)
  }
}
