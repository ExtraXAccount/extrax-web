import { useCallback, useEffect } from 'react'

// import { publicClient } from '@/components/RainbowKit/getChainsConfig'
import { useWagmiCtx } from '@/components/WagmiContext'
import { V2_CONFIG } from '@/constants/v2'

import dataProviderABI from '../abis/DataProvider.json'

export default function useV2Contract() {
  const { chainId, publicClient } = useWagmiCtx()

  // const { data, isError, isLoading } = useContractRead({
  //   address: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
  //   abi: dataProviderABI,
  //   functionName: 'getVaults',
  //   args: [vaultIds],
  // })

  // const serialized = serialize({ value: data })
  // console.log('useContractRead :>> ', data)

  const readContract = useCallback(
    async (functionName, args, options = {}) => {
      return await publicClient.readContract({
        address: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
        abi: dataProviderABI,
        functionName,
        args,
        ...options,
      })
    },
    [publicClient]
  )

  useEffect(() => {
    console.log('useWagmiCtx :>> ', { chainId, publicClient })
  }, [chainId, publicClient])

  useEffect(() => {
    async function test() {
      const config = V2_CONFIG[chainId]
      if (!config) {
        return
      }
      const vaults = Object.keys(config).map((key) => ({
        key,
        value: config[key],
      }))
      const vaultIds = vaults.map((item) => item.value.vaultId)

      const res: any = await readContract('getVaults', [vaultIds])

      // const res2 = await publicClient.readContract({
      //   address: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
      //   abi: [...dataProviderABI],
      //   functionName: 'getVaults',
      //   args: [vaultIds],
      // })

      // const serialized = serialize({ value: res })
      console.log('useContractRead :>> ', res)
    }

    // test()
  }, [chainId, readContract])

  return {
    readContract,
  }
}
