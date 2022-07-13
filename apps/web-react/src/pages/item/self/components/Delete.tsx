import { useDeleteItem } from '@hooks/item'
import { Button, Modal, notification } from 'antd'
import React from 'react'

type DeleteItemProps = {
  item: Item.Interface
  onFinish: () => void
}

const DeleteItem: React.FC<DeleteItemProps> = ({ item, onFinish }) => {
  const { fetching, loading } = useDeleteItem()

  const onClick = () => {
    Modal.confirm({
      title: 'Confirm',
      content: `Delete item ${item.id} ?`,
      onOk: () => {
        fetching(item.id).then(() => {
          notification.success({ message: `Item ${item.id} is deleted` })
          onFinish?.()
        })
      },
    })
  }

  return (
    <Button loading={loading} onClick={onClick} type="ghost">
      Delete
    </Button>
  )
}

export default DeleteItem
