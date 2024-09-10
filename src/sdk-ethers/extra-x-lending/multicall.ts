import { createPublicClient, http } from 'viem'
import { base, Chain, optimism } from 'viem/chains'

import { TENDERLY_RPC } from '@/constants/rpc'
import { SupportedChainId } from '@/sdk/constants/chains'

export const opPublicClient = createPublicClient({
  chain: optimism as Chain,
  transport: http(TENDERLY_RPC),
})

export const basePublicClient = createPublicClient({
  chain: base as Chain,
  transport: http(),
})

export const pubClient = {
  [SupportedChainId.OPTIMISM]: opPublicClient,
  [SupportedChainId.BASE]: basePublicClient,
}

export default async function multicallClient(
  chainId: SupportedChainId,
  address: string,
  ABI: any,
  functionName: string,
  argsArr: any[][],
) {
  const contractParams = {
    address,
    abi: ABI,
    functionName,
    allowFailure: true,
  } as const

  const publicClient = pubClient[chainId]
  if (!publicClient) {
    return null
  }

  const contracts = argsArr.map((item) => {
    return {
      ...contractParams,
      args: item,
    }
  })

  const results = await publicClient.multicall({
    contracts,
  })

  return results
}
