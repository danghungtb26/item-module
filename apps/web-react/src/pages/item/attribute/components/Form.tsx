import {
  useListenerModalVisibleChange,
  useSetLoadingModalForm,
  useSetOK,
} from '@components/ModalForm/context'
import { useCreateItemAttribute } from '@hooks/attribute'
import { Button, Form, FormInstance, Input, notification, Select, Switch } from 'antd'
import React, { useImperativeHandle, useRef } from 'react'

const { Item } = Form

const { Option } = Select

const attributeTypes = ['string', 'number', 'boolean', 'array', 'json']

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
      console.log('🚀 ~ file: Form.tsx ~ line 67 ~ value', value)
      const input: Item.AttributeData = value
      fetching({ id: data.current?.id, input }).then(r => {
        if (r) {
          onFinish?.(r)
          notification.success({
            message: `${data.current?.id ? 'Edit' : 'Create'} attribute ${
              data.current?.id
            } successfully`,
          })
          return
        }

        notification.error({
          message: 'Something wrong',
        })
      })
    }

    const form = useRef<FormInstance>(null)

    const renderForm = () => {
      return (
        <Form ref={form} onFinish={onSubmit}>
          <Item label="Name" name="name">
            <Input />
          </Item>
          <Item name="valueType" label="Type">
            <Select placeholder="Please select">
              {attributeTypes.map(i => (
                <Option key={i} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Item>
          <Item label="Required" name="required">
            <Switch />
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
