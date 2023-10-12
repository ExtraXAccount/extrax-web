import { useEffect, useState } from 'react'

import { Tick } from '@/types/uniswap.interface'
import { getPoolTicks } from '@/uniswap'

const cache = {}

export default function usePoolTicks(poolAddress: string) {
  const [data, setData] = useState<Tick[]>([])
  // const [loading, setLoading] = useState({})

  useEffect(() => {
    if (!poolAddress) {
      return
    }

    // if (loading[poolAddress]) {
    //   return
    // }

    if (cache[poolAddress]) {
      setData(cache[poolAddress])
      return
    }

    // setLoading({
    //   ...loading,
    //   [poolAddress]: true,
    // })
    getPoolTicks(poolAddress)
      .then((data) => {
        cache[poolAddress] = data
        setData(data)
      })
      .catch((err) => {
        console.warn(err)
      })
    // .finally(() => {
    //   setLoading({
    //     ...loading,
    //     [poolAddress]: false,
    //   })
    // })
  }, [poolAddress])

  return data
}
