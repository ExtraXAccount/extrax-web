import { useEffect, useState } from 'react'

import { Pool } from '@/types/uniswap.interface'
import { getPoolInfo } from '@/uniswap'

const cache = {}

export default function usePoolBaseInfo(poolAddress: string) {
  const [poolInfo, setPoolInfo] = useState<Pool>({} as Pool)

  useEffect(() => {
    if (!poolAddress) {
      return
    }

    if (cache[poolAddress]) {
      setPoolInfo(cache[poolAddress])
      return
    }

    getPoolInfo(poolAddress).then((poolData) => {
      cache[poolAddress] = poolData
      setPoolInfo(poolData)
    })
  }, [poolAddress])

  return poolInfo
}
