import { sumBy } from 'lodash'
import { useMemo } from 'react'

import { useAppSelector } from '@/state'

import usePrices from './usePrices'

export default function useDebt() {
  const lendingList = useAppSelector((state) => state.lending.poolStatus)

  const { prices } = usePrices()

  const debtAssets = useMemo(() => {
    return lendingList
      .filter((item) => item.borrowed > 0)
      .map((item) => {
        return {
          ...item,
          price: prices[item.tokenSymbol],
        }
      })
  }, [lendingList, prices])

  // const [debtAssets, setDebtAssets] = useState([
  //   {
  //     token: 'USDC',
  //     price: 1,
  //     amount: 3000,
  //   },
  //   {
  //     token: 'WETH',
  //     price: 1600,
  //     amount: 2,
  //   },
  // ])

  const debtVal = useMemo(() => {
    return sumBy(debtAssets, (item) => item.borrowed * item.price)
    // return debtAssets.reduce((prev, item) => {
    //   return prev + item.amount * item.price
    // }, 0)
  }, [debtAssets])

  return {
    debtVal,
    debtAssets,
  }
}
