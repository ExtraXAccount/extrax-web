// import { JsonRpcProvider } from '@ethersproject/providers'
// import { useSearchParams } from 'react-router-dom'
// import { useDeferredValue, useEffect, useMemo } from 'react'
// import { useDebounce } from 'use-debounce'
import { Account, Chain, PublicClient, Transport, WalletClient } from 'viem'
import { useAccount, useBlockNumber, usePublicClient, useWalletClient } from 'wagmi'

import { defaultChainId } from '@/constants'

// import useDebouncedMemo from '@/hooks/useDebouncedMemo'

export default function useWagmi() {
  const {
    address: account,
    chain: { id: chainId } = { id: defaultChainId },
    connector: activeConnector,
    isConnected: isActive,
  } = useAccount()
  const publicClient = usePublicClient() as PublicClient
  const { data: walletClient } = useWalletClient() as {
    data: WalletClient
  }
  const { data: blockNumber } = useBlockNumber()
  // const [searchParams] = useSearchParams()

  return {
    user: account,
    // account: (searchParams.get('addr') as `0x${string}`) || account,
    account,
    blockNumber: Number(blockNumber?.toString()),
    // currentAccount: '0x2a2C3B2a78b6c09a15520C97747bD1c5cbf39431',
    activeConnector,
    isActive,
    chainId,
    publicClient,
    walletClient,
  }
}
