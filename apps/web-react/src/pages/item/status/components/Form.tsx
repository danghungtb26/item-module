import {
  useListenerModalVisibleChange,
  useSetLoadingModalForm,
  useSetOK,
} from '@components/ModalForm/context'
import { useCreateOrUpdateItemStatus } from '@hooks/itemStatus'
import { Button, Form, FormInstance, Input, notification } from 'antd'
import React, { useImperativeHandle, useRef } from 'react'

const { Item } = Form

export type ItemStatusFormMethod = {
  initData?: Item.StatusInterface
}

export type ItemStatusFormProps = {
  initialData?: Item.StatusInterface
  onFinish?: (data: Item.StatusInterface) => void
}

const ItemStatusForm = React.forwardRef<ItemStatusFormMethod, ItemStatusFormProps>(
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

    const { loading, fetching } = useCreateOrUpdateItemStatus(data.current?.id)

    useSetLoadingModalForm(loading)
    useSetOK(() => form.current?.submit())
    useListenerModalVisibleChange(value => {
      if (!value) {
        form.current?.resetFields([])
        data.current = undefined
      }
    })

    const onSubmit = value => {
      const input: Item.StatusData = {
        name: value.name,
        description: value.description,
      }
      fetching({ id: data.current?.id, input }).then(r => {
        if (r) {
          onFinish?.(r)
          notification.success({
            message: `${data.current?.id ? 'Edit' : 'Create'} status ${
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
        <Form onFinish={onSubmit}>
          <Item label="Name">
            <Input />
          </Item>
          <Item label="Description">
            <Input.TextArea rows={4} />
          </Item>
          <Button title="Save" loading={loading} />
        </Form>
      )
    }
    return <div>{renderForm()}</div>
  }
)

export default ItemStatusForm
