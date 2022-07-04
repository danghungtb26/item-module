import TreeSelect from '@components/TreeSelect'
import { defaultFormItemLayout } from '@themes/styles'
import { Form, Input } from 'antd'
import React, { useImperativeHandle, useState } from 'react'

export type CategoryFormMethod = {
  initData?: CategoryInterface
}

export type CategoryFormProps = {
  initData?: CategoryInterface
}

const CategoryForm: React.FC<CategoryFormProps> = React.forwardRef<
  CategoryFormMethod,
  CategoryFormProps
>(({ initData }, ref) => {
  const [data, setData] = useState<CategoryFormProps['initData']>(initData)

  useImperativeHandle(ref, () => ({
    get initData() {
      return data
    },
    set initData(data) {
      setData(data)
    },
  }))

  return (
    <Form>
      <Form.Item name="name" label="Name" hasFeedback {...defaultFormItemLayout}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="description" label="Description" hasFeedback {...defaultFormItemLayout}>
        <Input placeholder="Description" />
      </Form.Item>
      <TreeSelect treeData={[]} />
    </Form>
  )
})

export default CategoryForm
