declare global {
  namespace Item {
    interface Interface {
      id: string | number

      categoryId: string | number

      category: CategoryInterface

      order: string
    }

    interface TypeInterface {
      id: string | number

      name: string

      description: string

      slug: string

      attach_to_sidebar?: boolean

      includes: AttributeInterface[]

      order: number

      created_at: string

      updated_at: string

      deleted_at: string
    }

    interface StatusInterface {
      id: string | number

      name: string

      description: string

      order: number

      created_at: string

      updated_at: string

      deleted_at: string
    }
  }
}

export {}
