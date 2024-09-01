import { ComputedUserReserve, FormatReserveUSDResponse } from '@aave/math-utils'
import { find, sumBy } from 'lodash'
import { useMemo } from 'react'

import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { toDecimals } from '@/sdk/utils/token'
import { useLendStore } from '@/store'
import { IFormattedPosition } from '@/store/lend'

export default function useFormatPositions(reserveId?: string) {
  const { formattedUserPosition } = useSmartAccount()

  const {
    formattedPositions,
    assetPositions,
    debtPositions,
    totalAssetValue,
    totalDebtValue,
  } = useMemo(() => {
    const formatted = formattedUserPosition?.userReservesData || []

    const filtered = !reserveId
      ? formatted
      : formatted.filter((item) => {
          return reserveId === item.reserve.id
        })

    const assetPositions: IFormattedPosition[] = []
    const debtPositions: IFormattedPosition[] = []

    filtered.forEach((item) => {
      if (Number(item.totalBorrowsUSD) > 0) {
        debtPositions.push({
          ...item,
          type: 'debt',
          value: item.totalBorrowsUSD,
          size: item.totalBorrows,
        })
      }
      if (Number(item.underlyingBalanceUSD) > 0) {
        assetPositions.push({
          ...item,
          type: 'asset',
          value: item.underlyingBalanceUSD,
          size: item.underlyingBalance,
        })
      }
    })

    return {
      formattedPositions: filtered,
      assetPositions,
      debtPositions,
      totalAssetValue: formattedUserPosition?.totalLiquidityUSD,
      totalDebtValue: formattedUserPosition?.totalBorrowsUSD,
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
