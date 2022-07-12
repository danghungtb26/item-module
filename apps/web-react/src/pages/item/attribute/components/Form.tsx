import {
  useListenerModalVisibleChange,
  useSetLoadingModalForm,
  useSetOK,
} from '@components/ModalForm/context'
import { useCreateItemAttribute } from '@hooks/attribute'
import { Button, Form, FormInstance, Input } from 'antd'
import React, { useImperativeHandle, useRef } from 'react'

const { Item } = Form

export type ItemAttributeFormMethod = {
  initData?: Item.StatusInterface
}

export type ItemAttributeFormProps = {
  initialData?: Item.StatusInterface
  onFinish?: (data: Item.StatusInterface) => void
}

const ItemAttributeForm = React.forwardRef<ItemAttributeFormMethod, ItemAttributeFormProps>(
  ({ onFinish, initialData }, ref) => {
    const data = useRef<Item.StatusInterface | undefined>(initialData)

    useImperativeHandle(ref, () => ({
      get initData() {
        return data.current
      },
      set initData(value) {
        data.current = value
        if (value) {
          setField(value)
        }
      },
      submit: () => {},
    }))

    const setField = (d?: Item.StatusInterface) => {
      form.current?.setFields([
        {
          name: 'name',
          value: d?.name,
        },
        {
          name: 'description',
          value: d?.description,
        },
      ])
    }

    const { loading, fetching } = useCreateItemAttribute()

    useSetLoadingModalForm(loading)
    useSetOK(() => form.current?.submit())
    useListenerModalVisibleChange(value => {
      if (!value) {
        form.current?.resetFields([])
        data.current = undefined
      }
    })

    const onSubmit = value => {
      const input: Item.AttributeData = value
      fetching({ id: data.current?.id, input }).then(r => {
        if (r) {
          onFinish?.(r)
        }
      })
    }

    const form = useRef<FormInstance>(null)

    const renderForm = () => {
      return (
        <Form onFinish={onSubmit}>
          <Item label="Name" name="name">
            <Input />
          </Item>
          <Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Item>
          <Button title="Save" loading={loading} />
        </Form>
      )
    }
    return <div>{renderForm()}</div>
  }
)

export default ItemAttributeForm
