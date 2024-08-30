import { ComputedUserReserve, FormatReserveUSDResponse } from '@aave/math-utils'
import { find, sumBy } from 'lodash'
import { useMemo } from 'react'

import usePrices from '@/hooks/usePrices'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { toDecimals } from '@/sdk/utils/token'
import { useLendStore } from '@/store'

export interface FormattedUserPosition extends ComputedUserReserve<FormatReserveUSDResponse> {
  type: string
}

export default function useFormatPositions(reserveId?: string) {
  // const { formattedLendPools } = useLendingList()
  // const { positions } = useLendStore()
  const { formattedUserPosition } = useSmartAccount()
  // const { getPrice } = usePrices()

  const { formattedPositions, assetPositions, debtPositions, totalAssetValue, totalDebtValue } =
    useMemo(() => {
      const formatted = formattedUserPosition?.userReservesData || []
      // const formatted =
      //   formattedUserPosition?.userReservesData.map((item) => {
      //     return item
      //     // const targetPool = find(formattedLendPools, (i) => {
      //     //   return i.id === item.reserveId
      //     // })

      //     // const type = 'none'
      //     // return {
      //     //   ...item,
      //     //   pool: targetPool,
      //     //   ...targetPool,
      //     //   type,
      //     //   price: targetPool ? getPrice(targetPool?.symbol) : 0,
      //     //   value: 0,
      //     // }
      //   }) || []

      const filtered = !reserveId
        ? formatted
        : formatted.filter((item) => {
            return reserveId === item.reserve.id
          })

      // type FormattedPositions = typeof formatted
      const assetPositions: FormattedUserPosition[] = []
      const debtPositions: FormattedUserPosition[] = []

      filtered.forEach((item) => {
        if (Number(item.totalBorrowsUSD) > 0) {
          debtPositions.push({
            ...item,
            type: 'debt',
            // value: toDecimals(item.debt, item.pool?.decimals) * item.price,
          })
        }
        if (Number(item.underlyingBalance) > 0) {
          assetPositions.push({
            ...item,
            type: 'asset',
            // value: toDecimals(item.liquidity, item.pool?.decimals) * item.price,
          })
        }
      })

      return {
        formattedPositions: filtered,
        assetPositions,
        debtPositions,
        totalAssetValue: formattedUserPosition?.totalLiquidityUSD,
        totalDebtValue: formattedUserPosition?.totalBorrowsUSD,
        // totalAssetValue: sumBy(assetPositions, 'value'),
        // totalDebtValue: sumBy(debtPositions, 'value'),
      }
    }, [
      formattedUserPosition?.totalBorrowsUSD,
      formattedUserPosition?.totalLiquidityUSD,
      formattedUserPosition?.userReservesData,
      reserveId,
    ])

  return {
    positions: formattedPositions,
    assetPositions,
    debtPositions,
    totalAssetValue,
    totalDebtValue,
  }
}
