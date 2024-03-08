// import { JsonRpcProvider } from '@ethersproject/providers'
// import { useSearchParams } from 'react-router-dom'
// import { useDeferredValue, useEffect, useMemo } from 'react'
// import { useDebounce } from 'use-debounce'
import { useAccount, useBlockNumber, useNetwork, usePublicClient, useWalletClient } from 'wagmi'

// import useDebouncedMemo from '@/hooks/useDebouncedMemo'

export default function useWagmi() {
  const { address: account, connector: activeConnector, isConnected: isActive } = useAccount()
  const { chain: { id: chainId } = {} } = useNetwork()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const {data: blockNumber} = useBlockNumber()
  // const [searchParams] = useSearchParams()

  return {
    // account: (searchParams.get('addr') as `0x${string}`) || account,
    account,
    blockNumber: Number(blockNumber?.toString()),
    smartAccount: '0x2a2C3B2a78b6c09a15520C97747bD1c5cbf39431',
    activeConnector,
    isActive,
    chainId,
    publicClient,
    walletClient,
  }
}
