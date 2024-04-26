import { useBalance } from 'wagmi'

import { useWagmiCtx } from '@/components/WagmiContext'
import { isWETH } from '@/sdk/utils/token'

// interface IBalanceProps {
//   token: string
//   // account: string
//   // chainId?: number
//   options?: any
// }

export function useFetchEthBalance(chainId?: number) {
  const { account, chainId: connectedChainId } = useWagmiCtx()

  const res = useBalance({
    chainId: chainId || connectedChainId,
    address: account,
  })

  return {
    balance: res.data?.formatted || '0',
    refetch: res.refetch,
    isRefetching: res.isRefetching,
  }
}

export default function useFetchBalance(token: string, chainId?: number, replaceWethWithEth = false) {
  const { account, chainId: connectedChainId } = useWagmiCtx()

  const res = useBalance({
    chainId: chainId || connectedChainId,
    address: account,
    // token: token as `0x${string}`,
    token: replaceWethWithEth && isWETH(chainId || connectedChainId, token) ? undefined : (token as `0x${string}`),
    // ...options,
  })

  // const res = useBalance({
  //   address: account,
  //   chainId: chainId || connectedChainId,
  // })
  // console.log('balance :>> ', balance?.data)
  // console.log('useFetchBalance :>> ', chainId, token, isWETH(chainId || connectedChainId, token), res)
  // console.log('useFetchBalance :>> ', res, chainId || connectedChainId, )
  return {
    balance: res.data?.formatted || '0',
    refetch: res.refetch,
    isRefetching: res.isRefetching,
  }
}
