import { BaseClass } from '@models/base'

export class ItemStatus extends BaseClass implements Item.StatusInterface {
  name: string

  description: string

  static fromJson(json: any): ItemStatus {
    return new ItemStatus(json)
  }
}
