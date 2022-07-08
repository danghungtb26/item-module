import TreeSelect from '@components/TreeSelect'
import { useCreateOrUpdateCategory } from '@hooks/category'
import { defaultFormItemLayout } from '@themes/styles'
import { Form, FormInstance, Input, Modal } from 'antd'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { CategoryFormProps } from './Form'

export type ModalFormMethod = {
  visible: boolean

  initData?: CategoryInterface
}

type ModalFormProps = CategoryFormProps & {}

const ModalForm = React.forwardRef<ModalFormMethod, ModalFormProps>(({ onFinished }, ref) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [initData, setInitData] = useState<CategoryInterface | undefined>()
  const form = useRef<FormInstance>(null)

  useImperativeHandle(ref, () => ({
    get visible() {
      return visible
    },

    set visible(value) {
      if (!value) {
        form.current?.resetFields()
      }
      setVisible(value)
    },

    get initData() {
      return initData
    },

    set initData(data) {
      setInitData(data)
    },
  }))

  const { loading, fetching } = useCreateOrUpdateCategory(initData?.id)()

  const onCancel = () => {
    if (loading) return
    form.current?.resetFields()
    setVisible(false)
    setInitData(undefined)
  }

  const onSubmit = () => {
    const input: CategoryData = {}
    fetching({ id: initData?.id, input }).then(r => {
      if (r) {
        onFinished?.(r)
      }
    })
  }

  const onOk = () => {
    form?.current?.submit()
  }

  const renderForm = () => {
    return (
      <Form ref={form} onFinish={onSubmit}>
        <Form.Item
          rules={[{ required: true, message: 'Required' }]}
          name="name"
          label="Name"
          hasFeedback
          {...defaultFormItemLayout}
          required
        >
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

  return (
    <Modal
      title={initData?.id ? 'Update' : 'Create'}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={onOk}
    >
      {renderForm()}
    </Modal>
  )
})

export default ModalForm
