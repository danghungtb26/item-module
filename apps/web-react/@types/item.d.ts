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
    }

    export interface TypeInterface extends Base {
      id: string | number

      name: string

      description: string

      slug?: string

      attach_to_sidebar?: boolean

      attributes: AttributeInterface[]

      statuses: StatusInterface[]
    }

    export type TypeData = DataType<TypeInterface>

    type TypeQuery = TypeData

    export interface StatusInterface extends Base {
      name: string

      description: string
    }

    export type StatusData = DataType<StatusInterface>

    type StatusQuery = StatusData
  }
}

export {}
