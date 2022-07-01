import CategoryApi from '@apis/category'
import { useCallback, useEffect, useState } from 'react'

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
        console.log('🚀 ~ file: category.ts ~ line 19 ~ useCategories ~ r', r)
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
