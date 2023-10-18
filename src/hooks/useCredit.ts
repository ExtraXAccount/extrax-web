import { useMemo } from 'react'

import useDebt from '@/hooks/useDebt'
import useDeposited from '@/hooks/useDeposited'

export default function useCredit() {
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
