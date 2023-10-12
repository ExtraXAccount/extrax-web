import { useEffect, useState } from 'react'

import { Pool } from '@/types/uniswap.interface'
import { getTopTvlPools } from '@/uniswap'

let loading = false
let cache: Pool[] = []

export default function usePools() {
  const [topPools, setTopPools] = useState<Pool[]>([])

  useEffect(() => {
    if (cache.length) {
      setTopPools(cache)
      return
    }

    if (loading) {
      return
    }

    loading = true
    // console.log('loading :>> ', loading)
    getTopTvlPools()
      .then((pools) => {
        cache = topPools
        setTopPools(pools)
      })
      .catch((err) => {
        console.warn(err)
      })
      .finally(() => {
        loading = false
      })
  }, [topPools])

  return topPools
}
