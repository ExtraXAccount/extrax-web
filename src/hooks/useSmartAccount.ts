import { sumBy } from 'lodash'
import { useMemo } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import useCredit from '@/hooks/useCredit'
import useDebt from '@/hooks/useDebt'
import useDeposited from '@/hooks/useDeposited'
import usePrices from '@/hooks/usePrices'
import { useAppSelector } from '@/state'
import { addComma, aprToApy, toPrecision } from '@/utils/math'

export const INFINITY = '∞'

export default function useSmartAccount() {
  const { prices } = usePrices()
  const { depositedVal, depositedAssets } = useDeposited()
  const { debtVal, debtAssets } = useDebt()
  const { maxCredit, availableCredit, usedCredit } = useCredit()
  const lendingList = useAppSelector((state) => state.lending.poolStatus)
  const { account = '', smartAccount } = useWagmiCtx()
  const positions = useAppSelector((state) => state.position.userPositions)

  const safetyRatio = useMemo(() => {
    if (!depositedVal) {
      return 0
    }
    // return toPrecision((depositedVal / (depositedVal + debtVal)) * 100) + '%'
    return debtVal / (depositedVal + debtVal)
  }, [debtVal, depositedVal])

  const accountAPY = useMemo(() => {
    const totalApy =
      (sumBy(
        lendingList,
        (item) =>
          (item.SavingsDAI || 0) * 0.05 +
          aprToApy(item.apr) * item.deposited * prices[item.tokenSymbol] -
          item.borrowingRate * item.borrowed * prices[item.tokenSymbol]
      ) +
        sumBy(positions, (item) => item.apr * item.totalPositionValue)) /
      depositedVal

    return totalApy
  }, [depositedVal, lendingList, positions, prices])

  return {
    smartAccount: depositedVal ? smartAccount : '',
    depositedVal,
    depositedAssets,
    debtVal,
    debtAssets,
    maxCredit,
    availableCredit,
    usedCredit,
    safetyRatio,
    accountAPY,
    lendingList,
  }
}
