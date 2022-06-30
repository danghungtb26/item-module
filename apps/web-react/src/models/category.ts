import { BaseClass } from './base'

export class Category extends BaseClass implements CategoryInterface {
  name: CategoryInterface['name']

  description: CategoryInterface['description']

  parentId: CategoryInterface['parentId']

  static fromJson(json: any) {
    return new Category(json)
  }
}
