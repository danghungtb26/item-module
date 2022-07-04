import { Form, Input } from 'antd'
import React from 'react'

const { Item } = Form

type ItemStatusFormProps = {}

const ItemStatusForm: React.FC<ItemStatusFormProps> = () => {
  const renderForm = () => {
    return (
      <Form>
        <Item label="Name">
          <Input />
        </Item>
        <Item label="Description">
          <Input.TextArea rows={4} />
        </Item>
      </Form>
    )
  }
  return <div>{renderForm()}</div>
}

export default ItemStatusForm
