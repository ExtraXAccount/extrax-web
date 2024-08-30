import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import useLendingList from '../Lend/useLendingList'

export default function useLendPoolInfo() {
  const { reserveId } = useParams()
  const { formattedLendPools } = useLendingList()

  const lendPoolInfo = useMemo(() => {
    return formattedLendPools.find((item) => item.id?.toString() === reserveId)
  }, [formattedLendPools, reserveId])

  return lendPoolInfo
}
