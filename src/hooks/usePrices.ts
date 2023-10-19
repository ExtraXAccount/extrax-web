import { useCallback, useEffect, useState } from 'react'

import useLendContract from '@/sdk/lend'
import { getCoingeckoPriceByIds } from '@/sdk/utils/coingecko'

export default function usePrices() {
  const { lendList } = useLendContract()

  const [prices, setPrices] = useState(null)
  useEffect(() => {
    const getPrices = async () => {
      const priceMap: any = {
        USDC: 1,
        // DAI: 1,
      }
      try {
        const result = await getCoingeckoPriceByIds(lendList.map((i) => i.cgId))

        // console.log('getCoingeckoPriceByIds :>> ', result)
        lendList.forEach((i) => {
          if (result[i.cgId]?.usd) {
            priceMap[i.tokenSymbol] = result[i.cgId].usd
          }
        })
        setPrices(priceMap)
      } catch (err) {
        console.warn(err)
      }
    }

    if (!prices) {
      getPrices()
    }
  }, [prices, lendList])

  const getPrice = useCallback(
    (token: string) => {
      return prices?.[token] || 0
    },
    [prices]
  )

  // console.log('prices :>> ', prices)
  return { prices, getPrice }
}
