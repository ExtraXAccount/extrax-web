import { sumBy } from 'lodash'
import { useMemo } from 'react'

import usePrices from '@/hooks/usePrices'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'

export default function useInfoChange(props: {
  reserveId: bigint | undefined
  amount: number
  type: 'liquidity' | 'debt'
  price: number
}) {
  const { healthStatus } = useSmartAccount()
  const { formattedLendPools } = useLendingList()
  const { getPrice } = usePrices()

  const nextTotalApy = useMemo(() => {
    const depositedVal = Number(healthStatus?.formatted?.collateralValueUsd) || 0
    const nextApy =
      sumBy(formattedLendPools, (item) => {
        if (props.reserveId === item.reserveId) {
          const depositAmount =
            props.type === 'liquidity'
              ? item.formatted.deposited + props.amount
              : item.formatted.deposited
          const borrowedAmount =
            props.type === 'debt'
              ? item.formatted.borrowed + props.amount
              : item.formatted.borrowed
          return (
            item.formatted.apy * depositAmount * getPrice(item.tokenSymbol) -
              item.formatted.borrowApy * borrowedAmount * getPrice(item.tokenSymbol) || 0
          )
        } else {
          return (
            item.formatted.apy * item.formatted.deposited * getPrice(item.tokenSymbol) -
              item.formatted.borrowApy *
                item.formatted.borrowed *
                getPrice(item.tokenSymbol) || 0
          )
        }
      }) / depositedVal
    return nextApy
  }, [
    formattedLendPools,
    getPrice,
    healthStatus?.formatted?.collateralValueUsd,
    props.amount,
    props.reserveId,
    props.type,
  ])

  const next = {
    accountApy: nextTotalApy,
  }
  return next
}
