declare global {
  namespace Item {
    interface AttributeInterface extends Base {
      name: string

      description: string

      required?: boolean

      valueType: 'string' | 'boolean' | 'number' | 'array' | 'json'
    }

    type AttributeData = DataType<AttributeData>

    type AttributeQuery = BaseQuery
  }
}

export {}
