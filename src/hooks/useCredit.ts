import { useMemo } from 'react'

import useDebt from '@/hooks/useDebt'
import useDeposited from '@/hooks/useDeposited'
import { useAppDispatch, useAppSelector } from '@/state'

export default function useCredit() {
  const lendingList = useAppSelector((state) => state.lending.poolStatus)
  const { depositedVal, depositedAssets } = useDeposited()
  const { debtVal, debtAssets } = useDebt()

  const maxCredit = useMemo(() => {
    return depositedVal * 5
  }, [depositedVal])

  return {
    maxCredit,
    availableCredit: maxCredit - debtVal,
  }
}
