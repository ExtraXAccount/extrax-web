import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'

import lendingPoolABI from './LendingPoolABI.json'
import lendData from './mock.json'

export default function useLendContract() {
  const { account, chainId, publicClient, walletClient } = useWagmiCtx()
  const [writeLoading, setWriteLoading] = useState(false)

  const lendList = useMemo(() => {
    return lendData
  }, [])

  const readContract = useCallback(
    async (functionName: string, args, options = {}) => {
      try {
        return await publicClient.readContract({
          address: CONTRACT_ADDRESSES[chainId]?.lend as `0x${string}`,
          abi: lendingPoolABI,
          functionName,
          args,
          ...options,
        })
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
          address: CONTRACT_ADDRESSES[chainId]?.lend,
          abi: lendingPoolABI,
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

  const depositAndStake = useCallback(
    (reserveId: string, amount: string) => {
      console.log('depositAndStake :>> ', [reserveId, amount, account, 1234])
      return writeContract('depositAndStake', [reserveId, amount, account, 1234])
    },
    [writeContract, account]
  )

  const unStakeAndWithdraw = useCallback(
    (reserveId: string, amount: string, receiveNativeETH = true) => {
      console.log('unStakeAndWithdraw :>> ', [reserveId, amount, account, receiveNativeETH])
      return writeContract('unStakeAndWithdraw', [reserveId, amount, account, receiveNativeETH])
    },
    [writeContract, account]
  )

  return {
    lendList,
    readContract,
    writeContract,
    depositAndStake,
    unStakeAndWithdraw,
    writeLoading,
  }
}
