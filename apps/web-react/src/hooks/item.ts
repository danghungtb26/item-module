import ItemApi from '@apis/item'
import { useState } from 'react'

export const useItems = (options?: { init: { page: number; limit: number } }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)
  const [page, setPage] = useState<{ current: number; max: number; count: number }>({
    count: 0,
    max: 10,
    current: 1,
  })

  const fetch: (p?: {
    pre?: Item.Interface[]
    page?: number
    limit?: number
    query?: Item.DataQuery
  }) => Promise<void> = async p => {
    return ItemApi.getListItem({ page: p?.page, limit: p?.limit, input: p?.query })
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
export const useItem = (p: { id: Item.Interface['id'] }) => {
  const [data, setData] = useState<Item.Interface>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetch: () => void = async () => {
    return ItemApi.getItem({ id: p.id })
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

export const useCreateItem = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemApi['createItem']>[0]) => {
    return ItemApi.createItem(p).then(r => {
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

export const useUpdateItem = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemApi['updateItem']>[0]) => {
    return ItemApi.updateItem(p).then(r => {
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

export const useCreateOrUpdateItem = (id?: Item.Interface['id']) => {
  if (id) return useCreateItem

  return useUpdateItem
}

export const useDeleteItem = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (id: Parameters<typeof ItemApi['deleteItem']>[0]['id']) => {
    return ItemApi.deleteItem({ id }).then(r => {
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
