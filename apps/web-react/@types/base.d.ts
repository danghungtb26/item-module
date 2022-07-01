declare global {
  export interface Base {
    readonly id: string | number

    order: number

    created_at: string

    updated_at: string

    deleted_at: string

    readonly createdAt: string

    readonly updatedAt: string

    readonly deletedAt: string
  }

  type DataType<T> = {
    [x in keyof T]?: T[x] extends () => any ? never : T[x]
  }
}

export {}
