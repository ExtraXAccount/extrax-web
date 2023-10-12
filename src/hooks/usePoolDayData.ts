import { useEffect, useState } from 'react'

import { PoolDayData, PoolHourData } from '@/types/uniswap.interface'
import { getPoolDayData, getPoolHourData } from '@/uniswap'

const cache = {}

export default function usePoolDayData(poolAddress: string) {
  const [poolDayDatas, setPoolDayData] = useState<PoolDayData[]>([])
  // const [poolHourDatas, setPoolHourData] = useState<PoolDayData[]>([])

  useEffect(() => {
    if (!poolAddress) {
      return
    }

    if (cache[poolAddress]) {
      setPoolDayData(cache[poolAddress])
      return
    }

    // getPoolHourData(poolAddress).then((data) => {
    //   setPoolHourData(data)
    // })

    getPoolDayData(poolAddress).then((data) => {
      cache[poolAddress] = data
      setPoolDayData(data)
    })
  }, [poolAddress])

  return poolDayDatas
}

const hourDataCache = {}

export function usePoolHourData(poolAddress: string) {
  const [poolHourDatas, setPoolHourData] = useState<PoolHourData[]>([])

  useEffect(() => {
    if (!poolAddress) {
      return
    }

    if (hourDataCache[poolAddress]) {
      setPoolHourData(hourDataCache[poolAddress])
      return
    }

    getPoolHourData(poolAddress).then((data) => {
      const result = data.reverse()
      hourDataCache[poolAddress] = result
      setPoolHourData(result)
    })
  }, [poolAddress])

  return poolHourDatas
}
