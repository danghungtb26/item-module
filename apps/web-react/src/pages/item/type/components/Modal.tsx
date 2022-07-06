import { Modal } from 'antd'
import React, { useImperativeHandle, useState } from 'react'
import ItemTypeForm from './Form'

export type ModalFormMethod = {
  visible: boolean

  initData?: Item.TypeInterface
}

type ModalFormProps = {}

const ModalForm = React.forwardRef<ModalFormMethod, ModalFormProps>((_, ref) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [initData, setInitData] = useState<Item.TypeInterface>()

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
      <ItemTypeForm initData={initData} />
    </Modal>
  )
})

export default ModalForm
