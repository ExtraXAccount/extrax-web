import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { useAppSelector } from '@/state'

import HealthManager from './HealthManager.json'
import ExtraXAccountFactory from './ExtraXAccountFactory.json'

const ExtraXAccountDefaultNonce = "0x8e09f6b044757f2ee7b9c6d556ffb9cf925a8681edcb87332d3650b59f784256";

export default function useAccountContract() {
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
          address: CONTRACT_ADDRESSES[chainId]?.healthManager as `0x${string}`,
          abi: HealthManager,
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

  const readFactoryContract = useCallback(
    async (functionName: string, args?: any, options = {}) => {
      try {
        const res = await publicClient.readContract({
          address: CONTRACT_ADDRESSES[chainId]?.accountFactory as `0x${string}`,
          abi: ExtraXAccountFactory,
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
          address: CONTRACT_ADDRESSES[chainId]?.lend,
          abi: HealthManager,
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

  const writeFactoryContract = useCallback(
    async (functionName: string, args, options = {}) => {
      try {
        setWriteLoading(true)
        const res = await walletClient.writeContract({
          chain: walletClient.chain,
          account,
          address: CONTRACT_ADDRESSES[chainId]?.accountFactory,
          abi: ExtraXAccountFactory,
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

  const getCollateralAndDebtValue = useCallback(async () => {
    const res = await readContract('getCollateralAndDebtValue', [account])
    const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('getCollateralAndDebtValue :>> ', {account, collateral, collateralDeciamls, debt, debtDecimals})
    return res
  }, [account, readContract])


  const getAccount = useCallback(async () => {
    const evts: any = await publicClient.getContractEvents({
      address: CONTRACT_ADDRESSES[chainId]?.accountFactory,
      abi: ExtraXAccountFactory,
      eventName: 'ExtraAccountCreation',
      args: {
        user: account,
        saltNonce: ExtraXAccountDefaultNonce
      },
      // fromBlock: 16330000n, 
      // toBlock: '16330050n'
    })
    // const evts = await publicClient.getFilterLogs({ filter })
    console.log('getAccount evts :>> ', evts);

    // let accountCreationFilter = await readFactoryContract(`filters["ExtraAccountCreation(address,uint256,address,address)"]`, [account, ExtraXAccountDefaultNonce])
  
    // let evts: any = await readFactoryContract('queryFilter', [
    //   accountCreationFilter,
    //   blockNumber - 100,
    //   "latest"
    // ]);
    
    const accounts = evts.map(evt => evt.args.proxy)
    // const accounts = evts.forEach((evt) => {
    //   return {
    //     user: evt.args[0],
    //     saltNonce: "0x" + evt.args[1].toString(16),
    //     account: evt.args[2],
    //   };
    // });
    console.log('accounts :>> ', accounts);
    return accounts
  }, [account, blockNumber, readFactoryContract])

  const createAccount = useCallback(async () => {
    const res = await writeFactoryContract('createProxyWithNonce', [ExtraXAccountDefaultNonce, ExtraXAccountDefaultNonce])
    // const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('createAccount res :>> ', res);
    const account = await getAccount()
    // console.log('createAccount :>> ', account)
    return account
  }, [getAccount, writeFactoryContract])

  const getPositionStatus = useCallback(async () => {
    const poolIds = ['2', '26', '1', '4']
    const res = await readContract('getPositionStatus', [poolIds, account])
    console.log('getPositionStatus :>> ', res)
  }, [readContract, account])

  // useEffect(() => {
  //   getCollateralAndDebtValue()
  //   // getPositionStatus()
  // }, [getCollateralAndDebtValue])

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
    getCollateralAndDebtValue,
    getAccount,
    createAccount,
    readContract,
    writeContract,
    depositAndStake,
    unStakeAndWithdraw,
    writeLoading,
    totalSavingsDAI,
  }
}
