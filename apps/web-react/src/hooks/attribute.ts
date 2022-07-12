import ItemAttributeApi from '@apis/item/attribute'
import { useCallback, useState } from 'react'

export const useAttributes = (options?: { init: { page: number; limit: number } }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)
  const [page, setPage] = useState<{ current: number; max: number; count: number }>({
    count: 0,
    max: 10,
    current: 1,
  })

  const fetch: (p?: {
    pre?: Item.AttributeInterface[]
    page?: number
    limit?: number
  }) => Promise<void> = useCallback(async p => {
    return ItemAttributeApi.getListItemAttribute({ page: p?.page, limit: p?.limit })
      .then(r => {
        if (r.cancel) return

        if (r.success) {
          setData((p?.pre ?? []).concat(r.data ?? []))
          setPage({
            count: r.page?.count ?? 0,
            max: r.page?.max ?? 1,
            current: r.page?.current ?? 1,
          })
          return
        }
        setError(r.message ?? true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

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

export const useCreateItemAttribute = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemAttributeApi['createItemAttribute']>[0]) => {
    return ItemAttributeApi.createItemAttribute(p).then(r => {
      if (r.success) {
        setLoading(false)
        setError(false)

        return r.data
      }
      setLoading(false)
      setError(true)

      return null
    })
  }

  return {
    loading,
    error,
    fetching,
  }
}
