// import { JsonRpcProvider } from '@ethersproject/providers'
// import { useSearchParams } from 'react-router-dom'
// import { useDeferredValue, useEffect, useMemo } from 'react'
// import { useDebounce } from 'use-debounce'
import { useAccount, useNetwork, usePublicClient, useWalletClient } from 'wagmi'

// import useDebouncedMemo from '@/hooks/useDebouncedMemo'

export default function useWagmi() {
  const { address: account, connector: activeConnector, isConnected: isActive } = useAccount()
  const { chain: { id: chainId } = {} } = useNetwork()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  // const [searchParams] = useSearchParams()

  return {
    // account: (searchParams.get('addr') as `0x${string}`) || account,
    account,
    smartAccount: '0x82D755822c6Adf626fCE5b0cC50fEECd9378f7C2',
    activeConnector,
    isActive,
    chainId,
    publicClient,
    walletClient,
  }
}
