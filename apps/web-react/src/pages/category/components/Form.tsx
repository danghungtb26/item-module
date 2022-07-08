import { useSetLoadingModalForm, useSetOK } from '@components/ModalForm/context'
import TreeSelect from '@components/TreeSelect'
import { useCreateOrUpdateCategory } from '@hooks/category'
import { defaultFormItemLayout } from '@themes/styles'
import { Button, Form, FormInstance, Input } from 'antd'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

export type CategoryFormMethod = {
  initData?: CategoryInterface
  submit: () => void
}

export type CategoryFormProps = {
  initData?: CategoryInterface
  onFinished?: (data: CategoryInterface) => void
}

const CategoryForm = React.forwardRef<CategoryFormMethod, CategoryFormProps>(
  ({ initData, onFinished }, ref) => {
    const [data, setData] = useState<CategoryFormProps['initData']>(initData)

    useImperativeHandle(ref, () => ({
      get initData() {
        return data
      },
      set initData(data) {
        setData(data)
      },
      submit: () => {},
    }))

    const { loading, fetching } = useCreateOrUpdateCategory(data?.id)()

    useSetLoadingModalForm(loading)
    useSetOK(() => form.current?.submit())

    const onSubmit = () => {
      const input: CategoryData = {}
      fetching({ id: data?.id, input }).then(r => {
        if (r) {
          onFinished?.(r)
        }
      })
    }

    const form = useRef<FormInstance>(null)

    return (
      <Form ref={form} onFinish={onSubmit}>
        <Form.Item name="name" label="Name" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description" label="Description" hasFeedback {...defaultFormItemLayout}>
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="parent" label="Parent" hasFeedback {...defaultFormItemLayout}>
          <TreeSelect treeData={[]} />
        </Form.Item>
      </Form>
    )
  }
)

export default CategoryForm
