import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { useAppSelector } from '@/state'

import ExtraXLending from './ExtraXLending.json'
import ILendingPool from './ILendingPool.json'

const ExtraXAccountDefaultNonce = "0x8ea9f6b044757f2ee7b9c6d556ffb9cf925a8681edcb87332d3650b59f784256";

export default function useLendingContract() {
  const { account, blockNumber, chainId, publicClient, walletClient } = useWagmiCtx()
  const [writeLoading, setWriteLoading] = useState(false)

  const lendingList = useAppSelector((state) => state.lending.poolStatus)

  const lendList = useMemo(() => {
    return lendingList
  }, [lendingList])

  const totalSavingsDAI = useMemo(() => {
    return lendList.find((item) => item.tokenSymbol === 'DAI')?.SavingsDAI || 0
  }, [lendList])

  const readContract = useCallback(
    async (functionName: string, args?: any, options = {}) => {
      try {
        const res = await publicClient.readContract({
          address: CONTRACT_ADDRESSES[chainId]?.lendingPool as `0x${string}`,
          abi: ExtraXLending,
          functionName,
          args,
          ...options,
        })
        console.log('readContract :>> ', res)
        return res
      } catch (err) {
        console.warn('readContract err: ', err)
      }
    },
    [chainId, publicClient]
  )

  const writeContract = useCallback(
    async (functionName: string, args, options = {}) => {
      try {
        setWriteLoading(true)
        const res = await walletClient.writeContract({
          chain: walletClient.chain,
          account,
          address: CONTRACT_ADDRESSES[chainId]?.lendingPool,
          abi: ExtraXLending,
          functionName,
          args,
          ...options,
        })
        return res
      } catch (err) {
        console.warn('writeContract err: ', err)
      } finally {
        setWriteLoading(false)
      }
    },
    [walletClient, account, chainId]
  )

  const getPoolStatus = useCallback(async(reserveId: string) => {
    const res = await readContract('getReserve', [reserveId])
    console.log('getPoolStatus :>> ', res)
    return res
  }, [readContract])


  return {
    lendList,
    readContract,
    writeContract,
    getPoolStatus,
    writeLoading,
    totalSavingsDAI,
  }
}
