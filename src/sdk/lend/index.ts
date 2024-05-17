import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { useAppSelector } from '@/state'

import lendingPoolABI from './LendingPoolABI.json'
import Item from 'antd/es/list/Item'
// import lendData from './mock.json'

// export const lendingList = lendData

export default function useLendContract() {
  const { account, chainId, publicClient, walletClient } = useWagmiCtx()
  const [writeLoading, setWriteLoading] = useState(false)

  const lendingList = useAppSelector((state) => state.lending.poolStatus)

  const lendList = useMemo(() => {
    return lendingList.map(item => ({
      ...item,
      deposited: 1
    }))
  }, [lendingList])

  const totalSavingsDAI = useMemo(() => {
    return lendList.find((item) => item.tokenSymbol === 'DAI')?.SavingsDAI || 0
  }, [lendList])

  const readContract = useCallback(
    async (functionName: string, args?: any, options = {}) => {
      try {
        const res = await publicClient.readContract({
          address: CONTRACT_ADDRESSES[chainId]?.lend as `0x${string}`,
          abi: lendingPoolABI,
          functionName,
          args,
          ...options,
        })
        // console.log('readContract :>> ', res)
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

  const getPoolStatus = useCallback(async () => {
    const poolIds = ['2', '26', '1', '4']
    const res = await readContract('getReserveStatus', [poolIds])
    console.log('getPoolStatus :>> ', res)
  }, [readContract])

  const getPositionStatus = useCallback(async () => {
    const poolIds = ['2', '26', '1', '4']
    const res = await readContract('getPositionStatus', [poolIds, account])
    console.log('getPositionStatus :>> ', res)
  }, [readContract, account])

  useEffect(() => {
    // getPoolStatus()
    // getPositionStatus()
  }, [getPoolStatus, getPositionStatus])

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
    totalSavingsDAI,
  }
}
