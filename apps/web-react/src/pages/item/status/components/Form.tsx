import { useSetLoadingModalForm, useSetOK } from '@components/ModalForm/context'
import { useCreateOrUpdateItemStatus } from '@hooks/itemStatus'
import { Button, Form, FormInstance, Input } from 'antd'
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
      },
      submit: () => {},
    }))

    const { loading, fetching } = useCreateOrUpdateItemStatus(data.current?.id)()

    useSetLoadingModalForm(loading)
    useSetOK(() => form.current?.submit())

    const onSubmit = () => {
      const input: Item.StatusData = {}
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
