export class BaseClass implements Base {
  id: Base['id']

  order: Base['order']

  created_at: Base['created_at']

  updated_at: Base['updated_at']

  deleted_at: Base['deleted_at']

  constructor(json: any) {
    const keys = Object.keys(json)
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index]
      this[key] = json[key]
    }
    // keys.forEach(key => {
    //   this[key] = json[key]
    // })
  }

  get createdAt() {
    return this.created_at
  }

  get updatedAt() {
    return this.updated_at
  }

  get deletedAt() {
    return this.deleted_at
  }

  static fromJson(json: any) {
    return new this(json)
  }
}
