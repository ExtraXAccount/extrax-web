import { useCallback, useEffect, useMemo } from 'react'

// import { publicClient } from '@/components/RainbowKit/getChainsConfig'
// import { useWagmiCtx } from '@/components/WagmiContext'
// import { V2_CONFIG } from '@/constants/v2'
// import lendingPoolABI from './LendingPool.json'
import lendData from './mock.json'

export default function useLendContract() {
  const lendList = useMemo(() => {
    return lendData
  }, [])

  return {
    lendList,
  }
}
