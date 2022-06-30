declare global {
  export interface CategoryInterface extends Base {
    id: string | number

    name?: string

    description?: string

    parentId?: string | number
  }

  export type CategoryData = Pick<CategoryInterface, 'name' | 'description' | 'order' | 'parentId'>
}

export {}
