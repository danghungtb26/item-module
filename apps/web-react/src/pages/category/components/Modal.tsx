import { Modal } from 'antd'
import React, { useImperativeHandle, useState } from 'react'
import CategoryForm from './Form'

export type ModalFormMethod = {
  visible: boolean

  initData?: CategoryInterface
}

type ModalFormProps = {}

const ModalForm = React.forwardRef<ModalFormMethod, ModalFormProps>((_, ref) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [initData, setInitData] = useState<CategoryInterface>()

  useImperativeHandle(ref, () => ({
    get visible() {
      return visible
    },

    set visible(value) {
      setVisible(value)
    },

    get initData() {
      return initData
    },

    set initData(data) {
      setInitData(data)
    },
  }))

  return (
    <Modal visible={visible}>
      <CategoryForm initData={initData} />
    </Modal>
  )
})

export default ModalForm
