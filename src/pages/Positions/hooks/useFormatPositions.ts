import { find, sumBy } from 'lodash'
import { useMemo } from 'react'

import usePrices from '@/hooks/usePrices'
import useLendingList from '@/pages/Lend/useLendingList'
import { toDecimals } from '@/sdk/utils/token'
import { useLendStore } from '@/store'

export default function useFormatPositions(reserveId?: bigint) {
  const { formattedLendPools } = useLendingList()
  const { positions } = useLendStore()
  const { getPrice } = usePrices()

  const {
    formattedPositions,
    assetPositions,
    debtPositions,
    totalAssetValue,
    totalDebtValue,
  } = useMemo(() => {
    const formatted = positions.map((item) => {
      const targetPool = find(formattedLendPools, (i) => {
        return i.marketId === item.marketId && i.reserveId === item.reserveId
      })

      const type = 'none'
      return {
        ...item,
        pool: targetPool,
        ...targetPool,
        type,
        price: targetPool ? getPrice(targetPool?.tokenSymbol) : 0,
        value: 0,
      }
    })

    const filtered = formatted.filter(item => {
      if (reserveId) {
        return reserveId === item.reserveId
      }
      return true
    })

    type FormattedPositions = typeof formatted
    const assetPositions: FormattedPositions = []
    const debtPositions: FormattedPositions = []

    filtered.forEach((item) => {
      if (item.debt > 0) {
        debtPositions.push({
          ...item,
          type: 'debt',
          value: toDecimals(item.debt, item.pool?.decimals) * item.price,
        })
      }
      if (item.liquidity > 0) {
        assetPositions.push({
          ...item,
          type: 'asset',
          value: toDecimals(item.liquidity, item.pool?.decimals) * item.price,
        })
      }
    })

    return {
      formattedPositions: filtered,
      assetPositions,
      debtPositions,
      totalAssetValue: sumBy(assetPositions, 'value'),
      totalDebtValue: sumBy(debtPositions, 'value'),
    }
  }, [formattedLendPools, positions, getPrice, reserveId])

  return {
    positions: formattedPositions,
    assetPositions,
    debtPositions,
    totalAssetValue,
    totalDebtValue,
  }
}
