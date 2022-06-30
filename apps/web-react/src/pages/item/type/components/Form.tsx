import { useAttributes } from '@hooks/attribute'
import { Form, Input } from 'antd'
import React from 'react'

const { Item } = Form

type ItemTypeFormProps = {}

const ItemTypeForm: React.FC<ItemTypeFormProps> = () => {
  const { fetch: fetchAttributes, data: attributes } = useAttributes()

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

export default ItemTypeForm
