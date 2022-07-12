import ItemTypeApi from '@apis/item/type'
import { useCallback, useState } from 'react'

export const useItemTypes = (options?: { init: { page: number; limit: number } }) => {
  const [data, setData] = useState<Item.TypeInterface[]>([])
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
  }) => Promise<void> = useCallback(async p => {
    setLoading(true)
    return ItemTypeApi.getListItemType({ page: p?.page, limit: p?.limit })
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

export const useCreateItemType = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemTypeApi['createItemType']>[0]) => {
    return ItemTypeApi.createItemType(p).then(r => {
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

export const useUpdateItemType = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemTypeApi['updateItemType']>[0]) => {
    return ItemTypeApi.updateItemType(p).then(r => {
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

export const useCreateOrUpdateItemType = (id?: Item.TypeInterface['id']) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof ItemTypeApi['updateItemType']>[0]) => {
    const method = id ? ItemTypeApi.updateItemType : ItemTypeApi.createItemType
    return method(p).then(r => {
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

export const useDeleteItemType = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (id: Parameters<typeof ItemTypeApi['deleteItemType']>[0]['id']) => {
    return ItemTypeApi.deleteItemType({ id }).then(r => {
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
