import { useCallback, useEffect, useRef, useState } from 'react'

type AsyncFunction<T, TArgs extends unknown[]> = (...args: TArgs) => Promise<T>

interface UseAsyncResult<T, TArgs extends unknown[]> {
  data: T | null
  loading: boolean
  error: unknown
  execute: (asyncFunction: AsyncFunction<T, TArgs>, ...args: TArgs) => Promise<T | undefined>
}

function useAsync<T, TArgs extends unknown[] = []>(): UseAsyncResult<T, TArgs> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const execute = useCallback(async (
    asyncFunction: AsyncFunction<T, TArgs>,
    ...args: TArgs
  ): Promise<T | undefined> => {
    if (isMountedRef.current) {
      setLoading(true)
      setError(null)
    }

    try {
      const result = await asyncFunction(...args)

      if (isMountedRef.current) {
        setData(result)
      }

      return result
    } catch (requestError) {
      if (isMountedRef.current) {
        setError(requestError)
      }

      return undefined
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  return { data, loading, error, execute }
}

export default useAsync
