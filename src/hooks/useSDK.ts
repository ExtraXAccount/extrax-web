import { useMemo } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { AccountManager, LendingManager } from '@/sdk'

export function useAccountManager() {
  const { account, chainId, publicClient, walletClient } = useWagmiCtx()
  const manager = useMemo(() => {
    return new AccountManager(chainId, publicClient, walletClient, account)
  }, [publicClient, walletClient, account, chainId])

  // console.log(manager)
  return manager
}

export function useLendingManager() {
  const { account, chainId, publicClient, walletClient } = useWagmiCtx()
  const manager = useMemo(() => {
    return new LendingManager(chainId, publicClient, walletClient, account)
  }, [publicClient, walletClient, account, chainId])

  // console.log(manager)
  return manager
}
