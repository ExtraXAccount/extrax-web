import { debounce } from 'lodash'
import { DependencyList, useCallback, useEffect, useState } from 'react'

/**
 * Debounced useMemo()
 */
export default function useDebouncedMemo<T>(factory: () => T, deps: DependencyList | undefined, delay: number): T {
  const [state, setState] = useState(factory())

  const debouncedSetState = useCallback(debounce(setState, delay), [])

  useEffect(() => {
    debouncedSetState(factory())
  }, deps)

  return state
}
