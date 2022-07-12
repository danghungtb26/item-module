import { BaseClass } from '@models/base'

export class ItemStatus extends BaseClass implements Item.StatusInterface {
  name: string

  description: string

  constructor(json: any) {
    super(json)
    const keys = Object.keys(json)
    keys.forEach(key => {
      this[key] = json[key]
    })
  }

  static fromJson(json: any): ItemStatus {
    return new ItemStatus(json)
  }
}
