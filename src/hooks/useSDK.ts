import { useMemo } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { AccountManager, AccountManager2, LendingManager, LendingManager2 } from '@/sdk'

export function useAccountManager() {
  const { account, chainId, publicClient, walletClient } = useWagmiCtx()
  const manager = useMemo(() => {
    return new AccountManager(chainId, publicClient, walletClient, account)
  }, [publicClient, walletClient, account, chainId])

  // console.log(manager)
  return manager
}

export function useAccountManager2() {
  const { account, chainId, publicClient, walletClient } = useWagmiCtx()
  const manager = useMemo(() => {
    return new AccountManager2(chainId, publicClient, walletClient, account)
  }, [publicClient, walletClient, account, chainId])

  // console.log(manager)
  return manager
}

export function useLendingManager2() {
  const { account, chainId, publicClient, walletClient } = useWagmiCtx()
  const manager = useMemo(() => {
    return new LendingManager2(chainId, publicClient, walletClient, account)
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
