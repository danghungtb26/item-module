import { useCallback, useEffect, useState } from 'react'

export const useAttributes = (options?: { callAfterInit: boolean }) => {
  const [data, setData] = useState<AttributeInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const fetch = useCallback(async () => {
    setData([])
    setLoading(false)
    setError(false)
    return true
  }, [])

  useEffect(() => {
    if (options?.callAfterInit ?? true) {
      fetch()
    }
  }, [options?.callAfterInit, fetch])

  return {
    data,
    fetch,
    loading,
    error,
  }
}
