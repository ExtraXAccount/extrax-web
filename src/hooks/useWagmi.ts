// import { JsonRpcProvider } from '@ethersproject/providers'
// import { useSearchParams } from 'react-router-dom'
// import { useDeferredValue, useEffect, useMemo } from 'react'
// import { useDebounce } from 'use-debounce'
import { useAccount, useNetwork, usePublicClient, useWalletClient } from 'wagmi'

// import useDebouncedMemo from '@/hooks/useDebouncedMemo'

export default function useWagmi() {
  const { address: account, connector: activeConnector, isConnected: isActive } = useAccount()
  const { chain: { id: chainId } = {} } = useNetwork()
  const provider = usePublicClient()
  const { data: signer } = useWalletClient()
  // const [searchParams] = useSearchParams()

  return {
    // account: (searchParams.get('addr') as `0x${string}`) || account,
    account,
    activeConnector,
    isActive,
    chainId,
    provider,
    signer,
  }
}
