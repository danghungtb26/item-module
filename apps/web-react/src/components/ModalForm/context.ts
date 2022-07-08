import { useMounted } from '@hooks/lifecycle'
import React, { useEffect } from 'react'

export interface ModalFormContextInterface {
  loading: boolean

  setLoading: (value: boolean) => void

  setOnOK: (p: () => void) => void
}

export const ModalFormDefaultValue: ModalFormContextInterface = {
  loading: false,
  setLoading: () => {},
  setOnOK: () => {},
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
