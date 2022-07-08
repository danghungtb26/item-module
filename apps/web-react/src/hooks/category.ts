import CategoryApi from '@apis/category'
import { useCallback, useState } from 'react'

type P = { pre?: CategoryInterface[]; page?: number; limit?: number }

export const useCategories = (options?: { init: { page: number; limit: number } }) => {
  const [data, setData] = useState<CategoryInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)
  const [page, setPage] = useState<{ current: number; max: number; count: number }>({
    count: 0,
    max: 10,
    current: 1,
  })

  const fetch = useCallback<(p?: P) => Promise<void>>(async p => {
    CategoryApi.getListCategory({ page: p?.page, limit: p?.limit })
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

export const useCategory = (p: { id: CategoryInterface['id'] }) => {
  const [data, setData] = useState<CategoryInterface>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)

  const fetch: () => void = async () => {
    return CategoryApi.getCategory({ id: p.id })
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

export const useCreateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof CategoryApi['createCategory']>[0]) => {
    setLoading(true)
    return CategoryApi.createCategory(p).then(r => {
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

export const useUpdateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (p: Parameters<typeof CategoryApi['updateCategory']>[0]) => {
    setLoading(true)
    return CategoryApi.updateCategory(p).then(r => {
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

export const useCreateOrUpdateCategory = (id?: CategoryInterface['id']) => {
  if (id) return useCreateCategory

  return useUpdateCategory
}

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | string>(false)

  const fetching = (id: Parameters<typeof CategoryApi['deleteCategory']>[0]['id']) => {
    return CategoryApi.deleteCategory({ id }).then(r => {
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
