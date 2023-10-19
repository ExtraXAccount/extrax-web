import { sumBy } from 'lodash'
import { useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/state'

import usePrices from './usePrices'

export default function useDeposited() {
  const lendingList = useAppSelector((state) => state.lending.poolStatus)

  const { prices } = usePrices()

  const depositedAssets = useMemo(() => {
    return lendingList
      .filter((item) => item.deposited > 0)
      .map((item) => {
        return {
          ...item,
          price: prices[item.tokenSymbol],
        }
      })
  }, [lendingList, prices])

  // const [depositedAssets, setDepositedAssets] = useState([
  //   {
  //     token: 'USDC',
  //     price: 1,
  //     deposited: 1000,
  //   },
  //   {
  //     token: 'WETH',
  //     price: 1600,
  //     deposited: 1,
  //   },
  // ])

  const depositedVal = useMemo(() => {
    return sumBy(depositedAssets, (item) => item.deposited * item.price)
    // return depositedAssets.reduce((prev, item) => {
    //   return prev + item.amount * item.price
    // }, 0)
  }, [depositedAssets])

  return {
    depositedVal,
    depositedAssets,
    // maxCredit: depositedVal * 5,
  }
}
