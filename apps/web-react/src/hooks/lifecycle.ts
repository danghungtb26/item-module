import { useEffect, useRef } from 'react'

export const useMounted = (callback: () => void) => {
  const isMounted = useRef<boolean>(false)

  useEffect(() => {
    if (isMounted.current) return () => {}

    isMounted.current = true
    callback()
    return () => {
      isMounted.current = false
    }
  }, [callback])
}
