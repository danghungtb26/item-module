import ItemStatusApi from '@apis/item/status'
import { useState } from 'react'

export const useItemStatuses = (options?: { init: { page: number; limit: number } }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)
  const [page, setPage] = useState<{ current: number; max: number; count: number }>({
    count: 0,
    max: 10,
    current: 1,
  })

  const fetch: (p?: {
    pre?: Item.StatusInterface[]
    page?: number
    limit?: number
  }) => Promise<void> = async p => {
    return ItemStatusApi.getListItemStatus({ page: p?.page, limit: p?.limit })
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
export const useItemStatus = (p: { id: Item.StatusInterface['id'] }) => {
  const [data, setData] = useState<Item.StatusInterface>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetch: () => void = async () => {
    return ItemStatusApi.getItemStatus({ id: p.id })
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

export const useCreateItemStatus = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemStatusApi['createItemStatus']>[0]) => {
    return ItemStatusApi.createItemStatus(p).then(r => {
      if (r.success) {
        setLoading(false)
        setError(false)

        return r.data
      }

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

export const useUpdateItemStatus = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemStatusApi['updateItemStatus']>[0]) => {
    return ItemStatusApi.updateItemStatus(p).then(r => {
      if (r.success) {
        setLoading(false)
        setError(false)

        return r.data
      }

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

export const useCreateOrUpdateItemStatus = (id?: Item.StatusInterface['id']) => {
  if (id) return useCreateItemStatus

  return useUpdateItemStatus
}

export const useDeleteItemStatus = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (id: Parameters<typeof ItemStatusApi['deleteItemStatus']>[0]['id']) => {
    return ItemStatusApi.deleteItemStatus({ id }).then(r => {
      if (r.success) {
        setLoading(false)
        setError(false)

        return true
      }

      setError(true)

      return false
    })
  }

  return {
    loading,
    error,
    fetching,
  }
}
