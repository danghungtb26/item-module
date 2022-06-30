declare global {
  export namespace Item {
    export interface Interface extends Base {
      id: string | number

      categoryId: string | number

      category: CategoryInterface
    }

    export type Data = Pick<Interface, 'categoryId'>

    export interface TypeInterface extends Base {
      id: string | number

      name: string

      description: string

      slug?: string

      attach_to_sidebar?: boolean

      includes: AttributeInterface[]
    }

    export type TypeData = Pick<
      TypeInterface,
      'attach_to_sidebar' | 'name' | 'description' | 'includes' | 'order' | 'slug'
    >

    export interface StatusInterface extends Base {
      name: string

      description: string
    }

    export type StatusData = Pick<StatusInterface, 'name' | 'description' | 'order'>
  }
}

export {}
