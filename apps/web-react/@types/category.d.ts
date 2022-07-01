declare global {
  export interface CategoryInterface extends Base {
    id: string | number

    name: string

    description: string

    parentId?: string | number
  }

  export type CategoryData = DataType<CategoryInterface>

  export type CategoryQuery = CategoryData
}

export {}
