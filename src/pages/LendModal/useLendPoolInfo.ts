import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import useLendingList from '../Lend/useLendingList'

export default function useLendPoolInfo() {
  const { marketId, reserveId } = useParams()
  const { formattedLendPools } = useLendingList()

  const lendPoolInfo = useMemo(() => {
    return formattedLendPools.find(
      (item) =>
        item.marketId?.toString() === marketId &&
        item.reserveId?.toString() === reserveId,
    )
  }, [formattedLendPools, marketId, reserveId])

  return lendPoolInfo
}
