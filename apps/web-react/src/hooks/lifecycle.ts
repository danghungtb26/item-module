import React, { useEffect, useRef } from 'react'
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

export const useFetchPage = (fetch: (p: { page: number; limit: number }) => void) => {
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 10)
    fetch({ page, limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
}
