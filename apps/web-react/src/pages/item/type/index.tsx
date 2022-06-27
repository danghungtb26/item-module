import { useAttributes } from '@hooks/useAttributes'
import React from 'react'

type ItemTypePageProps = {}

const ItemTypePage: React.FC<ItemTypePageProps> = () => {
  const { fetch, data: attributes } = useAttributes()

  return <div />
}

export default ItemTypePage
