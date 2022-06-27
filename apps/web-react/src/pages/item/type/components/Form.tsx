import { useAttributes } from '@hooks/useAttributes'
import React from 'react'

type ItemTypeFormProps = {}

const ItemTypeForm: React.FC<ItemTypeFormProps> = () => {
  const { fetch: fetchAttributes, data: attributes } = useAttributes()

  return <div />
}

export default ItemTypeForm
