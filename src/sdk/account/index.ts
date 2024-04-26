import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { useAppSelector } from '@/state'

import HealthManager from './HealthManager.json'
import ExtraXAccountFactory from './ExtraXAccountFactory.json'
import { getContract } from 'viem'
import { Client } from 'viem'
import { defaultChainId } from '@/constants'
import { SupportedChainId } from '@/constants/chains'

const ExtraXAccountDefaultNonce = "0x2222";

export class AccountManager {
  public chainId = defaultChainId
  public account: string
  // public contract: Contract
  // public dataContract: Contract
  // public tokenContract: TokenContract
  // public rewardList: RewardInfoItem[]
  // public RPC_URLS = CLIENT_RPC_URLS
  publicClient: Client
  walletClient: Client

  constructor(chainId: SupportedChainId, publicClient, walletClient, account?: string, ) {
    if (chainId && chainId in SupportedChainId) {
      this.chainId = chainId
    }
    if (account) {
      this.account = account
    }
    if (publicClient) {
      this.publicClient = publicClient
    }
    if (walletClient) {
      this.walletClient = walletClient
    }
  }

  public healthManagerContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.healthManager,
      abi: HealthManager,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
  }

  public factoryContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.accountFactory,
      abi: ExtraXAccountFactory,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
  }

  public async getAccount() {
    const evts: any = await this.factoryContract().getEvents.ExtraAccountCreation({
      user: this.account,
      saltNonce: ExtraXAccountDefaultNonce
    })

    console.log('getAccount evts :>> ', evts);
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
  }

  public async createAccount() {
    console.log('createAccount start :>> ', 'createProxyWithNonce', ['0x200', ExtraXAccountDefaultNonce]);
    const res = await this.factoryContract().write.createProxyWithNonce(['0x200', ExtraXAccountDefaultNonce])
    // const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('createAccount res :>> ', res);
    const account = await this.getAccount()
    console.log('createAccount :>> ', account)
    return account
  }


  public async getSupportedAssets() {
    const nextAssetId: any = await this.healthManagerContract().read.nextAssetId()
    console.log('getSupportedAssets :>> ', nextAssetId)
    const result = [] as any[]
    for (let i = 1n; i < nextAssetId; i++) {
      const res: any = await this.healthManagerContract().read.assets([i]);
      const [ assetType, underlyingTokensCalculator, data ] = res
      result.push({
        assetId: i,
        assetType,
        underlyingTokensCalculator,
        data,
      })
    }
    console.log('getSupportedAssets :>> ', result);
    return result
  }

  public async getSupportedDebts() {
    const nextDebtId: any = await this.healthManagerContract().read.nextDebtId()
    console.log('getSupportedDebts :>> ', nextDebtId)
    const result = [] as any[]
    for (let i = 1n; i < nextDebtId; i++) {
      const res: any = await this.healthManagerContract().read.debts([i]);
      const [ assetType, underlyingTokensCalculator, data ] = res
      result.push({
        assetId: i,
        assetType,
        underlyingTokensCalculator,
        data,
      })
    }
    console.log('getSupportedDebts :>> ', result);
    return result
  }

  public async getCollateralAndDebtValue(account: string) {
    const res = await this.healthManagerContract().read.getCollateralAndDebtValue([account])
    const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('getCollateralAndDebtValue :>> ', {account, collateral, collateralDeciamls, debt, debtDecimals})
    return res
  }

  public async getPositionStatus() {
    const poolIds = ['2', '26', '1', '4']
    const res = await this.healthManagerContract().read.getPositionStatus([poolIds, this.account])
    console.log('getPositionStatus :>> ', res)
  }

  public async depositAndStake(reserveId: string, amount: string) {
    console.log('depositAndStake :>> ', [reserveId, amount, this.account, 1234])
    return this.healthManagerContract().write.depositAndStake([reserveId, amount, this.account, 1234])
  }

  public async unStakeAndWithdraw(reserveId: string, amount: string, receiveNativeETH = true) {
    console.log('unStakeAndWithdraw :>> ', [reserveId, amount, this.account, receiveNativeETH])
    return this.healthManagerContract().write.unStakeAndWithdraw([reserveId, amount, this.account, receiveNativeETH])
  }
}


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

  const healthManagerContract = useMemo(() => {
    return getContract({
      address: CONTRACT_ADDRESSES[chainId]?.healthManager as `0x${string}`,
      abi: HealthManager,
      client: {
        public: publicClient as Client,
        wallet: walletClient as Client,
      }
    })
  }, [])

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

  const getCollateralAndDebtValue = useCallback(async (address: string) => {
    const res = await healthManagerContract.read.getCollateralAndDebtValue([address])
    const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('getCollateralAndDebtValue :>> ', {address, collateral, collateralDeciamls, debt, debtDecimals})
    return res
  }, [readContract])


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

    console.log('getAccount evts :>> ', evts);
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
    console.log('createAccount start :>> ', 'createProxyWithNonce', ['0x200', ExtraXAccountDefaultNonce]);
    const res = await writeFactoryContract('createProxyWithNonce', ['0x200', ExtraXAccountDefaultNonce])
    // const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('createAccount res :>> ', res);
    const account = await getAccount()
    console.log('createAccount :>> ', account)
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
