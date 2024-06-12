import { Client, erc20Abi, getContract, PublicClient } from 'viem'

import { defaultChainId } from '@/constants'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { SupportedChainId } from '@/constants/chains'
import { Address } from '@/types'

import { BalanceCheckerABI } from './BalanceCheckerABI'
import { ExtraXAccountFactoryABI } from './ExtraXAccountFactoryABI'
import { HealthManagerABI } from './HealthManagerABI'

const ExtraXAccountDefaultNonce = 100n

export class AccountManager {
  public chainId = defaultChainId
  public account: Address
  publicClient: Client
  walletClient: Client

  constructor(
    chainId: SupportedChainId,
    publicClient: Client,
    walletClient: Client,
    account?: Address,
  ) {
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
      abi: HealthManagerABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })
  }

  public async erc20Contract(erc20TokenAddr: Address) {
    const contract = getContract({
      address: erc20TokenAddr,
      abi: erc20Abi,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })

    const res = await contract.write.approve([erc20TokenAddr, 100n])
  }

  public factoryContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.accountFactory,
      abi: ExtraXAccountFactoryABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })
  }

  public async getAccounts() {
    const currentBlock = await (this.publicClient as PublicClient).getBlockNumber()
    // console.log('currentBlock :>> ', currentBlock);
    const evts = await this.factoryContract().getEvents.ExtraAccountCreation(
      {
        user: this.account,
        saltNonce: ExtraXAccountDefaultNonce,
      },
      {
        fromBlock: currentBlock - 1000n,
        toBlock: currentBlock,
      },
    )

    console.log('getAccount evts :>> ', evts)
    const accounts = evts.map((evt) => evt.args.proxy)
    // const accounts = evts.forEach((evt) => {
    //   return {
    //     user: evt.args[0],
    //     saltNonce: "0x" + evt.args[1].toString(16),
    //     account: evt.args[2],
    //   };
    // });
    console.log('accounts :>> ', accounts)
    return accounts
  }

  public async createAccount() {
    console.log('createAccount start :>> ', 'createProxyWithNonce', [
      '0x200',
      ExtraXAccountDefaultNonce,
    ])
    const res = await this.factoryContract().write.createProxyWithNonce([
      '0x200',
      ExtraXAccountDefaultNonce,
    ])
    // const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('createAccount res :>> ', res)
    const accounts = await this.getAccounts()
    console.log('createAccount :>> ', accounts)
    return accounts
  }

  public async getSupportedAssets() {
    const nextAssetId: any = await this.healthManagerContract().read.nextAssetId()
    // console.log('getSupportedAssets :>> ', nextAssetId)
    const result = [] as any[]
    for (let i = 1n; i < nextAssetId; i++) {
      const res: any = await this.healthManagerContract().read.assets([i])
      const [assetType, underlyingTokensCalculator, data] = res
      result.push({
        assetId: i,
        assetType,
        underlyingTokensCalculator,
        data,
      })
    }
    console.log('getSupportedAssets :>> ', result)
    return result
  }

  public async getSupportedDebts() {
    const nextDebtId: any = await this.healthManagerContract().read.nextDebtId()
    // console.log('getSupportedDebts :>> ', nextDebtId)
    const result = [] as any[]
    for (let i = 1n; i < nextDebtId; i++) {
      const res: any = await this.healthManagerContract().read.debts([i])
      const [assetType, underlyingTokensCalculator, data] = res
      result.push({
        assetId: i,
        assetType,
        underlyingTokensCalculator,
        data,
      })
    }
    console.log('getSupportedDebts :>> ', result)
    return result
  }

  public async getCollateralAndDebtValue(account: Address) {
    const res = await this.healthManagerContract().read.getCollateralAndDebtValue([
      account,
    ])
    const [collateral, collateralDeciamls, debt, debtDecimals] = res
    console.log('getCollateralAndDebtValue :>> ', {
      account,
      collateral,
      collateralDeciamls,
      debt,
      debtDecimals,
    })
    return { account, collateral, collateralDeciamls, debt, debtDecimals }
  }

  public async getBalances(accounts: Address[], tokens: Address[]) {
    const balanceChecker = getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.BalanceChecker,
      abi: BalanceCheckerABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })

    const balances = await balanceChecker.read.balances([accounts, tokens])
    // console.log('balanceChecker.balances :>> ', balances);
    return balances
  }
}

// export default function useAccountContract() {
//   const { account, blockNumber, chainId, publicClient, walletClient } = useWagmiCtx()
//   const [writeLoading, setWriteLoading] = useState(false)

//   const lendingList = useAppSelector((state) => state.lending.poolStatus)

//   const lendList = useMemo(() => {
//     return lendingList
//   }, [lendingList])

//   const totalSavingsDAI = useMemo(() => {
//     return lendList.find((item) => item.tokenSymbol === 'DAI')?.SavingsDAI || 0
//   }, [lendList])

//   const healthManagerContract = useMemo(() => {
//     return getContract({
//       address: CONTRACT_ADDRESSES[chainId]?.healthManager as `0x${string}`,
//       abi: HealthManagerABI,
//       client: {
//         public: publicClient as Client,
//         wallet: walletClient as Client,
//       }
//     })
//   }, [])

//   const readContract = useCallback(
//     async (functionName: string, args?: any, options = {}) => {
//       try {
//         const res = await publicClient.readContract({
//           address: CONTRACT_ADDRESSES[chainId]?.healthManager as `0x${string}`,
//           abi: HealthManagerABI,
//           functionName,
//           args,
//           ...options,
//         })
//         console.log('readContract :>> ', res)
//         return res
//       } catch (err) {
//         console.warn('readContract err: ', err)
//       }
//     },
//     [chainId, publicClient]
//   )

//   const readFactoryContract = useCallback(
//     async (functionName: string, args?: any, options = {}) => {
//       try {
//         const res = await publicClient.readContract({
//           address: CONTRACT_ADDRESSES[chainId]?.accountFactory as `0x${string}`,
//           abi: ExtraXAccountFactory,
//           functionName,
//           args,
//           ...options,
//         })
//         console.log('readContract :>> ', res)
//         return res
//       } catch (err) {
//         console.warn('readContract err: ', err)
//       }
//     },
//     [chainId, publicClient]
//   )

//   const writeContract = useCallback(
//     async (functionName: string, args, options = {}) => {
//       try {
//         setWriteLoading(true)
//         const res = await walletClient.writeContract({
//           chain: walletClient.chain,
//           account,
//           address: CONTRACT_ADDRESSES[chainId]?.lend,
//           abi: HealthManagerABI,
//           functionName,
//           args,
//           ...options,
//         })
//         return res
//       } catch (err) {
//         console.warn('writeContract err: ', err)
//       } finally {
//         setWriteLoading(false)
//       }
//     },
//     [walletClient, account, chainId]
//   )

//   const writeFactoryContract = useCallback(
//     async (functionName: string, args, options = {}) => {
//       try {
//         setWriteLoading(true)
//         const res = await walletClient.writeContract({
//           chain: walletClient.chain,
//           account,
//           address: CONTRACT_ADDRESSES[chainId]?.accountFactory,
//           abi: ExtraXAccountFactory,
//           functionName,
//           args,
//           ...options,
//         })
//         return res
//       } catch (err) {
//         console.warn('writeContract err: ', err)
//       } finally {
//         setWriteLoading(false)
//       }
//     },
//     [walletClient, account, chainId]
//   )

//   const getCollateralAndDebtValue = useCallback(async (address: string) => {
//     const res = await healthManagerContract.read.getCollateralAndDebtValue([address])
//     const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
//     console.log('getCollateralAndDebtValue :>> ', {address, collateral, collateralDeciamls, debt, debtDecimals})
//     return res
//   }, [readContract])

//   const getAccount = useCallback(async () => {
//     const evts: any = await publicClient.getContractEvents({
//       address: CONTRACT_ADDRESSES[chainId]?.accountFactory,
//       abi: ExtraXAccountFactory,
//       eventName: 'ExtraAccountCreation',
//       args: {
//         user: account,
//         saltNonce: ExtraXAccountDefaultNonce
//       },
//       // fromBlock: 16330000n,
//       // toBlock: '16330050n'
//     })

//     console.log('getAccount evts :>> ', evts);
//     const accounts = evts.map(evt => evt.args.proxy)
//     // const accounts = evts.forEach((evt) => {
//     //   return {
//     //     user: evt.args[0],
//     //     saltNonce: "0x" + evt.args[1].toString(16),
//     //     account: evt.args[2],
//     //   };
//     // });
//     console.log('accounts :>> ', accounts);
//     return accounts
//   }, [account, blockNumber, readFactoryContract])

//   const createAccount = useCallback(async () => {
//     console.log('createAccount start :>> ', 'createProxyWithNonce', ['0x200', ExtraXAccountDefaultNonce]);
//     const res = await writeFactoryContract('createProxyWithNonce', ['0x200', ExtraXAccountDefaultNonce])
//     // const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
//     console.log('createAccount res :>> ', res);
//     const account = await getAccount()
//     console.log('createAccount :>> ', account)
//     return account
//   }, [getAccount, writeFactoryContract])

//   const getPositionStatus = useCallback(async () => {
//     const poolIds = ['2', '26', '1', '4']
//     const res = await readContract('getPositionStatus', [poolIds, account])
//     console.log('getPositionStatus :>> ', res)
//   }, [readContract, account])

//   // useEffect(() => {
//   //   getCollateralAndDebtValue()
//   //   // getPositionStatus()
//   // }, [getCollateralAndDebtValue])

//   const depositAndStake = useCallback(
//     (reserveId: string, amount: string) => {
//       console.log('depositAndStake :>> ', [reserveId, amount, account, 1234])
//       return writeContract('depositAndStake', [reserveId, amount, account, 1234])
//     },
//     [writeContract, account]
//   )

//   const unStakeAndWithdraw = useCallback(
//     (reserveId: string, amount: string, receiveNativeETH = true) => {
//       console.log('unStakeAndWithdraw :>> ', [reserveId, amount, account, receiveNativeETH])
//       return writeContract('unStakeAndWithdraw', [reserveId, amount, account, receiveNativeETH])
//     },
//     [writeContract, account]
//   )

//   return {
//     lendList,
//     getCollateralAndDebtValue,
//     getAccount,
//     createAccount,
//     readContract,
//     writeContract,
//     depositAndStake,
//     unStakeAndWithdraw,
//     writeLoading,
//     totalSavingsDAI,
//   }
// }
