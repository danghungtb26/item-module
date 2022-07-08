import { Modal } from 'antd'
import React, { useImperativeHandle, useState } from 'react'
import ItemStatusForm, { ItemStatusFormProps } from './Form'

export type ModalFormMethod = {
  visible: boolean

  initData?: Item.StatusInterface
}

type ModalFormProps = ItemStatusFormProps & {}

const ModalForm = React.forwardRef<ModalFormMethod, ModalFormProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [initData, setInitData] = useState<Item.StatusInterface>()

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
      <ItemStatusForm {...props} initialData={initData} />
    </Modal>
  )
})

export default ModalForm
