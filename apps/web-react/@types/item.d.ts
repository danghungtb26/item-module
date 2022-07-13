declare global {
  export namespace Item {
    export interface Interface extends Base {
      id: string | number

      categoryId: string | number

      category: CategoryInterface
    }

    export type Data = DataType<Interface>

    export type DataQuery = {
      type?: string

      category?: string

      search?: string

      status?: string

      start?: string

      end?: string
    }

    export interface TypeInterface extends Base {
      id: string | number

      name: string

      description: string

      slug?: string

      attach_to_sidebar?: boolean

      attribute: AttributeInterface[]

      statuses: StatusInterface[]
    }

    export type TypeData = DataType<TypeInterface>

    type TypeQuery = BaseQuery

    export interface StatusInterface extends Base {
      name: string

      description: string
    }

    export type StatusData = DataType<StatusInterface>

    type StatusQuery = BaseQuery
  }
}

export {}
