import { BaseClass } from '@models/base'
import { Category } from '@models/category'

export class ItemClass extends BaseClass implements Item.Interface {
  categoryId: string | number

  category: CategoryInterface

  constructor(json: any) {
    super(json)

    if (json.category) {
      const category = Category.fromJson(json.category)
      delete json.category
      this.category = category
    }
  }

  static fromJson(json: any): ItemClass {
    return new ItemClass(json)
  }
}
