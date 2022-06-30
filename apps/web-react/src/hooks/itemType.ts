import { useCallback, useState } from 'react'

export const useItemTypes = (options?: { init: { page: number; limit: number } }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean | string>(false)
  const [page, setPage] = useState<{ current: number; max: number; count: number }>({
    count: 0,
    max: 10,
    current: 1,
  })

  const fetch = useCallback<(p?: { old?: any[]; page?: number; limit?: number }) => void>(p => {
    setData((p?.old ?? []).concat([]))
    setLoading(false)
    setError(false)
    setPage({ count: 0, max: 10, current: 1 })
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

  const fetch: () => void = () => {
    // setData()
    setLoading(false)
    setError(false)
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
