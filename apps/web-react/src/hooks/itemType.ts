import ItemTypeApi from '@apis/item/type'
import { useState } from 'react'

export const useItemTypes = (options?: { init: { page: number; limit: number } }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)
  const [page, setPage] = useState<{ current: number; max: number; count: number }>({
    count: 0,
    max: 10,
    current: 1,
  })

  const fetch: (p?: {
    pre?: Item.TypeInterface[]
    page?: number
    limit?: number
    query?: Item.TypeQuery
  }) => Promise<void> = async p => {
    return ItemTypeApi.getListItemType({ page: p?.page, limit: p?.limit })
      .then(r => {
        if (r.cancel) return

        if (r.success) {
          setData((p?.pre ?? []).concat(r.data ?? []))
          setPage({ count: 0, max: 10, current: 1 })
          return
        }
        setError(r.message ?? true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    data,
    loading,
    error,
    page,
    fetch,
    setLoading,
    setError,
  }
}
export const useItemType = (p: { id: Item.TypeInterface['id'] }) => {
  const [data, setData] = useState<Item.TypeInterface>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetch: () => void = async () => {
    return ItemTypeApi.getItemType({ id: p.id })
      .then(r => {
        if (r.cancel) return

        if (r.success) {
          setData(r.data)
          return
        }
        setError(r.message ?? true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    data,
    loading,
    error,
    fetch,
    setLoading,
    setError,
    setData,
  }
}
