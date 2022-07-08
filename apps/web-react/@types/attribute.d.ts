declare global {
  namespace Item {
    interface AttributeInterface extends Base {
      name: string

      required?: boolean

      valueType: 'string' | 'boolean' | 'number' | 'array' | 'json'
    }
  }
}

export {}
