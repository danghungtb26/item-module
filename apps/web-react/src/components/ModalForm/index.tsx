import { Modal } from 'antd'
import React, { useImperativeHandle, useState } from 'react'

export type ModalFormMethod = {
  hide: () => void

  show: () => void
}

type ModalFormProps = {
  children: React.ReactNode
}

const ModalForm = React.forwardRef<ModalFormMethod, ModalFormProps>(({ children }, ref) => {
  const [visible, setVisible] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    hide: () => {
      setVisible(false)
    },
    show: () => {
      setVisible(true)
    },
  }))

  return <Modal visible={visible}>{children}</Modal>
})

export default ModalForm
