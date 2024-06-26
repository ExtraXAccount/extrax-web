import { erc20Abi, getContract, PublicClient, WalletClient } from 'viem'

import { defaultChainId } from '@/constants'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { SupportedChainId } from '@/constants/chains'
import { Address } from '@/types'

import { BalanceCheckerABI } from './BalanceCheckerABI'
import { ExtraXAccountFactoryABI } from './ExtraXAccountFactoryABI'
import { HealthManagerABI } from './HealthManagerABI'

// const ExtraXAccountDefaultNonce = 100n
const protocolTag = 1n

export class AccountManager {
  public chainId = defaultChainId
  public account: Address
  publicClient: PublicClient
  walletClient: WalletClient

  constructor(
    chainId: SupportedChainId,
    publicClient: PublicClient,
    walletClient: WalletClient,
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

    const res = await contract.write.approve([erc20TokenAddr, 100n], {
      chain: this.walletClient.chain,
      account: this.account,
    })
    return res
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

  public async createAccount() {
    const userAccountTag = Math.floor(new Date().getTime() / 1000)
    console.log('createAccount start :>> ', protocolTag, userAccountTag)
    const res = await this.factoryContract().write.createAccount(
      [protocolTag, BigInt(userAccountTag), '0x'],
      {
        chain: this.walletClient.chain,
        account: this.account,
      },
    )
    // const [ collateral, collateralDeciamls, debt, debtDecimals ] = res as any
    console.log('createAccount res :>> ', res)
    const tx = await (this.publicClient as PublicClient).waitForTransactionReceipt({
      hash: res,
    })
    console.log('createAccount tx :>> ', tx)
    const accounts = await this.getAccounts()
    console.log('createAccount :>> ', accounts)
    return accounts
  }

  public async getAccounts() {
    const [...accounts] = await this.factoryContract().read.accounts([this.account])
    console.log('accounts :>> ', accounts)
    return accounts
  }
  // public async getAccountsCreatedEvent() {
  //   const currentBlock = await (this.publicClient as PublicClient).getBlockNumber()
  //   // console.log('currentBlock :>> ', currentBlock);
  //   const evts = await this.factoryContract().getEvents.AccountCreated(
  //     {
  //       owner: this.account,
  //       // protocolTag,
  //     },
  //     {
  //       fromBlock: currentBlock - 1000n,
  //       toBlock: currentBlock,
  //     },
  //   )
  //   console.log('getAccount evts :>> ', evts)
  //   const accounts = evts.map((evt) => evt.args.account!)
  //   console.log('accounts :>> ', accounts)
  //   return accounts
  // }

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

    console.log('balanceChecker :>> ', { accounts, tokens })
    const balances = await balanceChecker.read.balances([accounts, tokens])
    console.log('balanceChecker.balances :>> ', balances)
    return balances
  }
}
