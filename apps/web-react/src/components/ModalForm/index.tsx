import { Modal, ModalProps } from 'antd'
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { ModalFormContext, ModalFormContextInterface } from './context'

export type ModalFormMethod = {
  visible: boolean
}

type ModalFormProps = Omit<ModalProps, 'visible' | 'onCancel'> & {
  children: React.ReactNode

  onCancel?: () => boolean
}

const ModalForm = React.forwardRef<ModalFormMethod, ModalFormProps>(
  ({ children, onCancel: cancel, ...props }, ref) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<ModalFormContextInterface['loading']>(false)
    const index = useRef<number>(0)
    const listeners = useRef<
      {
        id: number
        listener: Parameters<ModalFormContextInterface['listenerVisibleChange']>[0]
      }[]
    >([])

    const listenerVisibleChange = useRef<ModalFormContextInterface['listenerVisibleChange']>(
      listener => {
        const currentIndex = index.current
        listeners.current.push({ id: index.current, listener })
        index.current += 1
        return () => {
          listeners.current = listeners.current.filter(i => i.id !== currentIndex)
        }
      }
    )

    useEffect(() => {
      listeners.current.map(i => i.listener(visible))
    }, [visible])

    const onOk = useRef<() => void>(() => {})

    useImperativeHandle(ref, () => ({
      set visible(value) {
        setVisible(value)
      },
      get visible() {
        return visible
      },
    }))

    const setOnOk = useRef<ModalFormContextInterface['setOnOK']>(value => {
      onOk.current = value
    })

    const value: ModalFormContextInterface = useMemo(() => {
      return {
        loading,
        setLoading,
        setOnOK: setOnOk.current,
        listenerVisibleChange: listenerVisibleChange.current,
      }
    }, [loading])

    const onCancel = () => {
      if (loading) return
      cancel?.()
      setVisible(false)
    }

    return (
      <ModalFormContext.Provider value={value}>
        <Modal
          {...props}
          onOk={onOk.current}
          onCancel={onCancel}
          visible={visible}
          confirmLoading={loading}
        >
          {children}
        </Modal>
      </ModalFormContext.Provider>
    )
  }
)

export default ModalForm
