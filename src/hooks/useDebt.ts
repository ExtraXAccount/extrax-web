import { sumBy } from 'lodash'
import { useMemo, useState } from 'react'

export default function useDebt() {
  const [debtAssets, setDebtAssets] = useState([
    {
      token: 'USDC',
      price: 1,
      amount: 3000,
    },
    {
      token: 'WETH',
      price: 1600,
      amount: 2,
    },
  ])

  const debtVal = useMemo(() => {
    return sumBy(debtAssets, (item) => item.amount * item.price)
    // return debtAssets.reduce((prev, item) => {
    //   return prev + item.amount * item.price
    // }, 0)
  }, [debtAssets])

  return {
    debtVal,
    debtAssets,
  }
}
