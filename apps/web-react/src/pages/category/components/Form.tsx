import {
  useListenerModalVisibleChange,
  useSetLoadingModalForm,
  useSetOK,
} from '@components/ModalForm/context'
import TreeSelect from '@components/TreeSelect'
import { useCategories, useCreateOrUpdateCategory } from '@hooks/category'
import { defaultFormItemLayout } from '@themes/styles'
import { Form, FormInstance, Input, notification } from 'antd'
import React, { useImperativeHandle, useRef, useState } from 'react'

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

    const { data: categories, fetch } = useCategories()

    useImperativeHandle(ref, () => ({
      get initData() {
        return data
      },
      set initData(data) {
        setData(data)
        if (data) {
          setField(data)
        }
      },
      submit: () => {},
    }))

    const setField = (d?: CategoryInterface) => {
      form.current?.setFields([
        {
          name: 'name',
          value: d?.name,
        },
        {
          name: 'description',
          value: d?.description,
        },
        {
          name: 'parentId',
          value: d?.parentId,
        },
      ])
    }

    const { loading, fetching } = useCreateOrUpdateCategory(data?.id)

    useSetLoadingModalForm(loading)
    useSetOK(() => form.current?.submit())
    useListenerModalVisibleChange(value => {
      if (!value) {
        form.current?.resetFields()
        setData(undefined)
      }

      if (value) {
        fetch()
      }
    })

    const onSubmit = value => {
      const input: CategoryData = {
        name: value.name,
        description: value.description,
        parentId: value.parentId,
      }
      fetching({ id: data?.id, input }).then(r => {
        if (r) {
          onFinished?.(r)
          notification.success({
            message: `${data?.id ? 'Edit' : 'Create'} category ${data?.id} successfully`,
          })
          return
        }

        notification.error({
          message: 'Something wrong',
        })
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
        <Form.Item name="parentId" label="Parent" hasFeedback {...defaultFormItemLayout}>
          <TreeSelect treeData={categories.map(i => ({ key: i.id, value: i.id, title: i.name }))} />
        </Form.Item>
      </Form>
    )
  }
)

export default CategoryForm
