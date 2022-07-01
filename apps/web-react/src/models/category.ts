import { BaseClass } from './base'

export class Category extends BaseClass implements CategoryInterface {
  name: CategoryInterface['name']

  description: CategoryInterface['description']

  parentId: CategoryInterface['parentId']

  constructor(json: any) {
    super(json)
    const keys = Object.keys(json)
    keys.forEach(key => {
      this[key] = json[key]
    })
  }

  static fromJson(json: any) {
    return new Category(json)
  }
}
