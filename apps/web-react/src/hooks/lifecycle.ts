import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useMounted = (callback: () => void) => {
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (isMounted.current) return

    isMounted.current = true
    callback()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isMounted,
  }
}

export const useFetchPage = (
  fetch: (p: { page: number; limit: number; input?: Record<string, any> }) => void
) => {
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 10)
    const search = searchParams.get('search') ?? ''
    const start = searchParams.get('start') ?? ''
    const end = searchParams.get('end') ?? ''
    fetch({
      page,
      limit,

      input: {
        search,
        start,
        end,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
}
