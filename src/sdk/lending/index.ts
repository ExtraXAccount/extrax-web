import { useCallback, useEffect, useMemo, useState } from 'react'

import { getContract } from 'viem'
import { useWagmiCtx } from '@/components/WagmiContext'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { useAppSelector } from '@/state'

import ERC20ABI from '../abis/erc20.json'
import ExtraXLending from './ExtraXLending.json'
import MultiSendCallOnly from './MultiSendCallOnly.json'
import { LendingConfig } from './lending-pool'
// const ExtraXAccountDefaultNonce = "0x8ea9f6b044757f2ee7b9c6d556ffb9cf925a8681edcb87332d3650b59f784256";

export type Address = `0x${string}`

export default function useLendingContract() {
  const { user, blockNumber, chainId, publicClient, walletClient } = useWagmiCtx()
  const [writeLoading, setWriteLoading] = useState(false)

  const lendingList = useAppSelector((state) => state.lending.poolStatus)

  const lendList = useMemo(() => {
    return lendingList
  }, [lendingList])

  const totalSavingsDAI = useMemo(() => {
    return lendList.find((item) => item.tokenSymbol === 'DAI')?.SavingsDAI || 0
  }, [lendList])

  const getErc20Contract = useCallback(({address, client }) => {
    return getContract({
      address,
      abi: ERC20ABI,
      client,
    }) as any
  }, [])

  const multiSendCall = useCallback(
    async (functionName: string, args, options = {}) => {
      try {
        setWriteLoading(true)
        const res = await walletClient.writeContract({
          chain: walletClient.chain,
          account: user,
          address: CONTRACT_ADDRESSES[chainId]?.MultiSendCallOnly,
          abi: MultiSendCallOnly,
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
    [walletClient, user, chainId]
  )

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
          account: user,
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
    [walletClient, user, chainId]
  )

  const getPoolStatus = useCallback(async(reserveId: string) => {
    const res = await readContract('getReserve', [reserveId])
    console.log('getPoolStatus :>> ', res)
    return res
  }, [readContract])

  const approve = useCallback(
    async (account: string, reserveId: string, amount: string) => {
      console.log('deposit lending :>> ', [reserveId, amount, account])
      const lendConfig: any = Object.values(LendingConfig[chainId]).find((item: any) => item.reserveId.toString() === reserveId)
      const erc20Contract = getErc20Contract({
        address: lendConfig.underlyingTokenAddress,
        // abi: ERC20ABI,
        client: { public: publicClient, wallet: walletClient }
      })

      await erc20Contract.write.approve(account, amount)
      // return writeContract('depositAndStake', [reserveId, amount, account, user])
    },
    [chainId, publicClient, walletClient]
  )


  return {
    lendList,
    readContract,
    writeContract,
    getPoolStatus,
    writeLoading,
    totalSavingsDAI,
  }
}
