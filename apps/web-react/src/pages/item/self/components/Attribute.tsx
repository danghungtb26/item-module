import { Input, Switch } from 'antd'

type ItemAttributeProps = {
  name: string

  required?: boolean

  type: 'string' | 'number' | 'boolean' | 'array' | 'json'
}

export const ItemAttribute: React.FC<ItemAttributeProps> = ({ type }) => {
  switch (type) {
    case 'string':
      return <Input />
    case 'number':
      return <Input type="number" />
    case 'boolean':
      return <Switch />
    default:
      return null
  }
}
