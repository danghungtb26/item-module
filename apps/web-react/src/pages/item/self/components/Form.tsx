import TreeSelect from '@components/TreeSelect'
import { useAttributes } from '@hooks/attribute'
import { useItemStatuses } from '@hooks/itemStatus'
import { useItemTypes } from '@hooks/itemType'
import { useMounted } from '@hooks/lifecycle'
import { defaultFormItemLayout } from '@themes/styles'
import { Form, Input, Select } from 'antd'
import React from 'react'

type ItemFormProps = {
  initData?: Item.Interface
  initLoading?: boolean
}

const ItemForm: React.FC<ItemFormProps> = ({ initData, initLoading = false }) => {
  const { data: attributes, fetch: fetchAttributes } = useAttributes()
  const { data: types, fetch: fetchTypes } = useItemTypes()
  const { data: statuses, fetch: fetchStatuses } = useItemStatuses()

  useMounted(() => {
    fetchAttributes()
    fetchTypes()
    fetchStatuses()
  })

  const renderForm = () => {
    return (
      <Form>
        <Form.Item
          initialValue={initData}
          name="name"
          label="Name"
          hasFeedback
          {...defaultFormItemLayout}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="category" label="Category" hasFeedback {...defaultFormItemLayout}>
          <TreeSelect treeData={[]} />
        </Form.Item>
        <Form.Item name="type" label="Type" hasFeedback {...defaultFormItemLayout}>
          <Select />
        </Form.Item>
        <Form.Item name="status" label="Status" hasFeedback {...defaultFormItemLayout}>
          <Select />
        </Form.Item>
        <Form.Item name="slug" label="Slug" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Slug" />
        </Form.Item>
        <Form.Item name="title" label="Title" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="subtitle" label="Subtitle" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Subtitle" />
        </Form.Item>
      </Form>
    )
  }

  return <div>{renderForm()}</div>
}

export default ItemForm
