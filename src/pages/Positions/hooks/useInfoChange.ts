import { FormatReserveUSDResponse } from '@aave/math-utils'
import { sumBy } from 'lodash'
import { useMemo } from 'react'

import usePrices from '@/hooks/usePrices'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { mul, plus } from '@/utils/math/bigNumber'

export default function useInfoChange(props: {
  reserve: FormatReserveUSDResponse | undefined
  amount: number
  type: 'liquidity' | 'debt'
}) {
  const { reserve, amount, type} = props
  const { formattedUserPosition } = useSmartAccount()

  const nextTotalApy = useMemo(() => {
    if (!reserve) {
      return 0
    }
    const depositedVal = Number(formattedUserPosition?.totalLiquidityUSD) || 0

    // console.log(depositedVal)
    const nextApy =
      sumBy(formattedUserPosition?.userReservesData, (item) => {
        if (reserve.id === item.reserve.id) {
          const valueChanged = mul(amount, reserve.priceInUSD).toNumber()
          console.log(valueChanged)
          const depositRate =
            type === 'liquidity'
              ? plus(valueChanged, item.underlyingBalanceUSD).multipliedBy(item.reserve.supplyAPY)
              : mul(item.reserve.supplyAPY, item.underlyingBalanceUSD)
          const borrowedRate =
            type === 'debt'
              ? plus(valueChanged, item.totalBorrowsUSD).multipliedBy(item.reserve.variableBorrowAPR)
              : mul(item.reserve.variableBorrowAPR, item.totalBorrowsUSD)
            return depositRate
              .minus(borrowedRate)
              .toNumber()
        } else {
          return mul(item.reserve.supplyAPY, item.underlyingBalanceUSD)
            .minus(mul(item.reserve.variableBorrowAPR, item.totalBorrowsUSD))
            .toNumber()
        }
      }) / depositedVal
    return nextApy
  }, [
    formattedUserPosition,
    amount,
    reserve,
    type,
  ])

  const next = {
    accountApy: nextTotalApy,
  }
  return next
}
