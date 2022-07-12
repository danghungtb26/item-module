import { useMounted } from '@hooks/lifecycle'
import React, { useEffect } from 'react'

export interface ModalFormContextInterface {
  loading: boolean

  setLoading: (value: boolean) => void

  setOnOK: (p: () => void) => void

  listenerVisibleChange: (p: (value: boolean) => void) => (id?: number) => void
}

export const ModalFormDefaultValue: ModalFormContextInterface = {
  loading: false,
  setLoading: () => {},
  setOnOK: () => {},
  listenerVisibleChange: () => () => {},
}

export const ModalFormContext =
  React.createContext<ModalFormContextInterface>(ModalFormDefaultValue)
export const useModalForm = () => {
  return React.useContext(ModalFormContext)
}

export const useSetLoadingModalForm = (value: boolean) => {
  const { setLoading } = useModalForm()

  useEffect(() => {
    setLoading(value)
  }, [setLoading, value])
}

export const useSetOK = (value: Parameters<ModalFormContextInterface['setOnOK']>[0]) => {
  const { setOnOK } = useModalForm()
  useMounted(() => {
    setOnOK(value)
  })
}

export const useListenerModalVisibleChange = (
  listener: Parameters<ModalFormContextInterface['listenerVisibleChange']>[0]
) => {
  const { listenerVisibleChange } = useModalForm()

  useEffect(() => {
    const l = listenerVisibleChange(listener)
    return l
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenerVisibleChange])
}
