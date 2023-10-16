import { sumBy } from 'lodash'
import { useMemo, useState } from 'react'

export default function useDeposited() {
  const [depositedAssets, setDepositedAssets] = useState([
    {
      token: 'USDC',
      price: 1,
      amount: 1000,
    },
    {
      token: 'WETH',
      price: 1600,
      amount: 1,
    },
  ])

  const depositedVal = useMemo(() => {
    return sumBy(depositedAssets, (item) => item.amount * item.price)
    // return depositedAssets.reduce((prev, item) => {
    //   return prev + item.amount * item.price
    // }, 0)
  }, [depositedAssets])

  return {
    depositedVal,
    depositedAssets,
  }
}
