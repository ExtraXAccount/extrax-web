import { sumBy } from 'lodash'
import { useMemo } from 'react'

import useDebt from '@/hooks/useDebt'
import useDeposited from '@/hooks/useDeposited'
// import { useAppDispatch, useAppSelector } from '@/state'

const MAX_LEVERAGE = 5

export default function useCredit() {
  // const lendingList = useAppSelector((state) => state.lending.poolStatus)
  const { depositedVal, depositedAssets } = useDeposited()
  const { debtVal, debtAssets } = useDebt()

  const maxCredit = useMemo(() => {
    return sumBy(depositedAssets, (item) => item.deposited * item.price * item.collateralFactor) * MAX_LEVERAGE
    // return depositedVal * MAX_LEVERAGE
  }, [depositedAssets])

  const usedCredit = useMemo(() => {
    return sumBy(debtAssets, (item) => (item.borrowed * item.price) / item.borrowFactor)
  }, [debtAssets])

  return {
    maxCredit,
    usedCredit,
    availableCredit: maxCredit - usedCredit,
  }
}
