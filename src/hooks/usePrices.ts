import { useCallback } from 'react'

import { useAppSelector } from '@/state'

export default function usePrices() {
  const prices = useAppSelector((state) => state.price.prices)

  const getPrice = useCallback(
    (token: string) => {
      return prices?.[token] || 0
    },
    [prices]
  )

  // console.log('prices :>> ', prices)
  return { prices, getPrice }
}
