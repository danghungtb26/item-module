import { useDeleteCategory } from '@hooks/category'
import { Button, Modal, notification } from 'antd'
import React from 'react'

type DeleteCategoryProps = {
  category: CategoryInterface
  onFinish?: () => void
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ category, onFinish }) => {
  const { fetching, loading } = useDeleteCategory()

  const onClick = () => {
    Modal.confirm({
      title: 'Confirm',
      content: `Delete category ${category.id} ?`,
      onOk: () => {
        fetching(category.id).then(() => {
          notification.success({ message: `Category ${category.id} is deleted` })
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

export default DeleteCategory
