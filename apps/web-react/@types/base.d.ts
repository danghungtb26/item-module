declare global {
  export interface Base {
    readonly id: string | number

    order: number

    created_at: string

    updated_at: string

    deleted_at: string

    // method
    readonly createdAt: string

    readonly updatedAt: string
  }
}

export {}
