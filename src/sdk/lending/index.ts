import { BrowserProvider, JsonRpcSigner } from 'ethers'
import {
  Account,
  Chain,
  Client,
  encodeAbiParameters,
  encodeFunctionData,
  encodePacked,
  erc20Abi,
  getContract,
  Hex,
  parseAbiParameters,
  PublicClient,
  toBytes,
  Transport,
  WalletClient,
} from 'viem'

import { defaultChainId } from '@/constants'
import { CONTRACT_ADDRESSES } from '@/constants/addresses'
import { SupportedChainId } from '@/constants/chains'
import { Address } from '@/types'

import { ERC20ABI } from '../abis/erc20ABI'
import { ExtraXAccountABI } from '../account/ExtraXAccountABI'
import { HealthManagerABI } from '../account/HealthManagerABI'
import { isWETH } from '../utils/token'
// import { buildSignedMetaTransaction } from './build-safe-transaction'
import { ExtraXLendingABI } from './ExtraXLendingABI'
import { HealthManagerConfig } from './health-manager-config'
import { LendingConfig } from './lending-pool'
import { MultiSendCallOnlyABI } from './MultiSendCallOnlyABI'

const defaultMarketId = 1n

export interface IMetaTx {
  to: Address
  value: bigint
  data: Address
  operation: number // 0x1 delegateCall, 0x0 call
  extra: Hex
}

export interface MetaTransaction {
  to: Address
  value: string | number | bigint
  data: Address
  operation: number
}

export function encodeMetaTransaction(tx: MetaTransaction) {
  const data = toBytes(tx.data)
  const encoded = encodePacked(
    ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
    [tx.operation, tx.to, BigInt(tx.value), BigInt(data.length), tx.data]
  )
  return encoded.slice(2)
}

export function encodeMultiSend(txs: MetaTransaction[]): Hex {
  return `0x${txs.map((tx) => encodeMetaTransaction(tx)).join('')}`
}

export class LendingManager {
  public chainId = defaultChainId
  public account: Address = '0x'
  public publicClient: PublicClient
  public walletClient: WalletClient

  constructor(chainId: SupportedChainId, publicClient: PublicClient, walletClient: WalletClient, account?: Address) {
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

  public getExtraXLendingContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.lendingPool,
      abi: ExtraXLendingABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })
  }

  public getErc20Contract(erc20TokenAddr: Address) {
    return getContract({
      address: erc20TokenAddr,
      abi: erc20Abi,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })
  }

  public getMultiSendCallOnlyContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.MultiSendCallOnly,
      abi: MultiSendCallOnlyABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })
  }

  public async getPoolStatus(reserveId: bigint) {
    const res = await this.getExtraXLendingContract().read.getReserveStatus([defaultMarketId, reserveId])
    console.log('getPoolStatus :>> ', res)
    return res
  }
  public async multicallPoolsStatus(reserveIds: bigint[]) {
    const reserveStatus = await this.getExtraXLendingContract().read.getMultiReserveStatus([
      defaultMarketId,
      reserveIds,
    ])
    const reserveStorage = await this.getExtraXLendingContract().read.getMultiReserveStorage([
      defaultMarketId,
      reserveIds,
    ])
    console.log('getMultiReserveStatus :>> ', { reserveStatus, reserveStorage })
    return reserveStorage.map((item, index) => {
      return {
        ...item,
        ...reserveStatus[index],
      }
    })
    // const lendContract = {
    //   address: CONTRACT_ADDRESSES[this.chainId]?.lendingPool,
    //   abi: ExtraXLendingABI,
    //   functionName: 'getMultiReserveStatus',
    // }
    // const results = await (this.publicClient as any).multicall({
    //   contracts: reserveIds.map((reserveId) => {
    //     return {
    //       ...lendContract,
    //       args: [reserveId],
    //     }
    //   }),
    // })
    // console.log('multicallPoolsStatus :>> ', results)
    // return results.map((item) => item.result)
  }

  public async getUserHealthStatus(account: Address) {
    // Health status, including DEBT, LTV, LIQUIDATE_VALUE
    const healthStatus = await this.getExtraXLendingContract().read.calculateUserHealthData([defaultMarketId, account])

    console.log('healthStatus :>> ', healthStatus)
    return healthStatus
  }

  public async getUserPositions(account: Address) {
    const reserves = await this.getExtraXLendingContract().read.getActiveReservesOf([defaultMarketId, account])
    // console.log('getUserLendStatus:', reserves)
    const positions = await Promise.all(
      reserves.map((reserveId) => {
        return this.getExtraXLendingContract().read.getPosition([defaultMarketId, reserveId, account])
      })
    )
    console.log('getUserPositions :>> ', positions)
    return positions
  }

  public async requireAllowance(tokenAddress: Address, targetAddress: Address, amount: bigint, useNativeETH = true) {
    if (useNativeETH && isWETH(this.chainId, tokenAddress)) {
      return false
    }
    const tokenContract = getContract({
      address: tokenAddress,
      abi: ERC20ABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })
    // console.log('readallowance :>> ', [this.account, targetAddress])
    const res = await tokenContract.read.allowance([this.account, targetAddress])
    console.log('readallowance :>> ', res)
    return res < amount
  }

  // public async approve2(address: Address, tokenAddr: Address, amount: bigint) {
  //   console.log('deposit lending :>> ', [tokenAddr, amount, address])
  //   const erc20Contract = new Contract(
  //     tokenAddr,
  //     erc20Abi,
  //     clientToSigner(this.walletClient as any),
  //   )
  //   const tx = await erc20Contract.approve(address, amount)
  //   console.log('tx :>> ', tx)
  //   const res = await tx.wait()
  //   console.log('res :>> ', res)
  //   await this.requireAllowance(tokenAddr, address, amount)
  // }

  public async approve(address: Address, tokenAddr: Address, amount: bigint) {
    console.log('deposit lending :>> ', [tokenAddr, amount, address])
    const erc20Contract = this.getErc20Contract(tokenAddr)
    const hash = await erc20Contract.write.approve([address, amount], {
      chain: this.walletClient.chain,
      account: this.account,
    })
    const tx = await (this.publicClient as PublicClient).waitForTransactionReceipt({
      hash,
      confirmations: 1,
    })
    console.log('waitForTransactionReceipt :>> ', tx)
    // await this.requireAllowance(tokenAddr, address, amount)
    return tx
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

  public getExtraXAccountContract(safeAccount: Address) {
    return getContract({
      address: safeAccount,
      abi: ExtraXAccountABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      },
    })
  }

  public async buildSetAsCollateralTx(assetId: bigint, chainId?: SupportedChainId) {
    const funcData = encodeFunctionData({
      abi: HealthManagerABI,
      functionName: 'setAsCollateral',
      args: [assetId],
    })
    const metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.healthManager,
      data: funcData,
      value: 0n,
      operation: 0, // 0x1 delegateCall, 0x0 call
      extra: '0x' as Hex,
    }
    return metaTx
  }

  public async buildDepositToAccountTx(tokenAddress: Address, safeAccount: Address, amount: bigint, ethValue?: bigint) {
    const funcData = encodeFunctionData({
      abi: ERC20ABI,
      functionName: 'transferFrom',
      args: [this.account, safeAccount, amount],
    })
    const metaTx = {
      to: tokenAddress,
      data: funcData,
      value: ethValue || 0n,
      operation: 0, // 0x1 delegateCall, 0x0 call
      extra: '0x' as Hex,
    }
    return metaTx
  }

  public async buildApproveLendingTx(
    tokenAddress: Address,
    amount: bigint,
    ethValue?: bigint,
    chainId?: SupportedChainId
  ) {
    const funcData = encodeFunctionData({
      abi: ERC20ABI,
      functionName: 'approve',
      args: [CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool, amount],
    })
    const metaTx = {
      to: tokenAddress,
      data: funcData,
      value: ethValue || 0n,
      operation: 0, // 0x1 delegateCall, 0x0 call
      extra: '0x' as Hex,
    }
    return metaTx
  }

  public async buildDepositToLendingTx(
    marketId: bigint,
    reserveId: bigint,
    amount: bigint,
    ethValue?: bigint,
    chainId?: SupportedChainId
  ) {
    // const params = ethers.AbiCoder.defaultAbiCoder().encode(
    //   ['uint256', 'uint256', 'uint256'],
    //   [marketId, reserveId, amount],
    // )
    const params = encodeAbiParameters(parseAbiParameters('uint256, uint256, uint256'), [marketId, reserveId, amount])

    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'deposit',
      args: [params],
    })
    const metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: ethValue || 0n,
      operation: 0, // 0x1 delegateCall, 0x0 call
      extra: '0x' as Hex,
    }
    return metaTx
  }

  // public async multiSend(
  //   safeAccount: Address,
  //   transactions: { to: Address; value: bigint; data: Address }[],
  // ) {
  //   let nonce = 3n
  //   // let nonce = await this.getExtraXAccountContract(safeAccount).read.nonce()

  //   console.log('nonce :>> ', nonce)
  //   const signedSafeTransactions: MetaTransaction[] = []

  //   for (const tx of transactions) {
  //     console.log(tx)

  //     signedSafeTransactions.push(
  //       await buildSignedMetaTransaction(
  //         this.publicClient,
  //         this.walletClient,
  //         this.account,
  //         safeAccount,
  //         tx,
  //         nonce++,
  //       ),
  //     )
  //   }

  //   const encodedMultiSendTx = encodeMultiSend(signedSafeTransactions)

  //   // console.log('encodedMultiSendTx :>> ', signedSafeTransactions, encodedMultiSendTx);
  //   const multiSendCall = this.getMultiSendCallOnlyContract()

  //   // const estimateFee = await multiSendCall.estimateGas.multiSend([encodedMultiSendTx]);
  //   // console.log('estimateFee :>> ', estimateFee);

  //   const res = await multiSendCall.write.multiSend([encodedMultiSendTx], {
  //     // gasLimit: calculateGasLimit(estimateFee),
  //     chain: this.walletClient.chain,
  //     account: this.account,
  //     gas: 2000000n,
  //   })

  //   return res
  // }

  public async multicall(
    safeAccount: Address,
    transactions: {
      to: Address
      value: bigint
      data: Address
      operation: number // 0x1 delegateCall, 0x0 call
      extra: Hex
    }[]
  ) {
    console.log('multicall...', {
      safeAccount,
      transactions,
    })
    const encodedData: Hex[] = []
    for (const tx of transactions) {
      // console.log(tx)
      encodedData.push(
        encodeFunctionData({
          abi: ExtraXAccountABI,
          functionName: 'execTransaction',
          args: [tx],
        })
      )
    }

    const res = this.getExtraXAccountContract(safeAccount).write.multicall([encodedData], {
      chain: this.walletClient.chain,
      account: this.account,
    })

    return res
  }

  public async depositToLending(safeAccount: Address, reserveId: bigint, amount: bigint, useNativeETH = true) {
    console.log('depositToLending :>> ', {
      safeAccount,
      reserveId,
      amount,
      useNativeETH,
    })
    // Apprve the Account transfer assets from user's wallet
    // Note: This tx cannot be batched to a multiSend Transaction
    console.log('approve ...')
    const lendConfig: any = Object.values(LendingConfig[this.chainId]).find((item: any) => item.reserveId === reserveId)
    const token = lendConfig.name
    let ethValue = 0n
    if (useNativeETH && isWETH(this.chainId, lendConfig.underlyingTokenAddress)) {
      ethValue = amount
    }
    const requireAllowance = await this.requireAllowance(
      lendConfig.underlyingTokenAddress,
      safeAccount,
      amount,
      useNativeETH
    )
    console.log('requireAllowance :>> ', requireAllowance)
    if (requireAllowance) {
      await this.approve(safeAccount, lendConfig.underlyingTokenAddress, amount)
    }

    const transactions: IMetaTx[] = []

    console.log('assetId :>> ', HealthManagerConfig[this.chainId].assets[`${token}_BASIC_ASSET`].assetId)
    // transactions.push(
    //   await this.buildSetAsCollateralTx(
    //     HealthManagerConfig[this.chainId].assets[`${token}_BASIC_ASSET`].assetId,
    //   ),
    // )
    // transactions.push(
    //   await this.buildSetAsCollateralTx(
    //     HealthManagerConfig[this.chainId].assets[`${token}_ETOKEN_ASSET`].assetId,
    //   ),
    // )

    transactions.push(
      await this.buildDepositToAccountTx(
        LendingConfig[this.chainId][token].underlyingTokenAddress,
        safeAccount,
        amount,
        ethValue
      )
    )

    transactions.push(
      await this.buildApproveLendingTx(LendingConfig[this.chainId][token].underlyingTokenAddress, amount)
    )

    transactions.push(
      await this.buildDepositToLendingTx(
        LendingConfig[this.chainId][token].marketId,
        LendingConfig[this.chainId][token].reserveId,
        amount
        // ethValue
      )
    )
    // const hash = await this.multiSend(safeAccount, transactions)
    const hash = await this.multicall(safeAccount, transactions)
    // console.log('hash :>> ', hash, this.publicClient)

    const tx = await (this.publicClient as PublicClient).waitForTransactionReceipt({
      hash,
      confirmations: 1,
    })
    console.log('tx :>> ', tx)
    // await this.requireAllowance(
    //   lendConfig.underlyingTokenAddress,
    //   safeAccount,
    //   amount,
    //   useNativeETH,
    // )
    return tx
    // const provider = new JsonRpcProvider(
    //   'https://rpc.tenderly.co/fork/fcdf1b53-1c59-4502-9bff-2887be8073b0',
    // )
    // const trx = await provider.getTransaction(hash)

    // console.log('trx :>> ', tx, trx)
    // // await trx?.wait()
    // const res = await trx?.wait()
    // console.log('res :>> ', res)
    // return res
    // console.log('multicall tx :>> ', { tx })
    // return tx
  }

  public async buildWithdrawTransaction(
    marketId: bigint,
    reserveId: bigint,
    eTokenAmount: bigint,
    chainId?: SupportedChainId
  ) {
    const params = encodeAbiParameters(parseAbiParameters('uint256, uint256, uint256, bool'), [
      marketId,
      reserveId,
      eTokenAmount,
      false,
    ])
    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'withdraw',
      args: [params],
    })
    const metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: 0n,
      operation: 0,
      extra: '0x' as Hex,
    }
    return metaTx
  }
  public async withdraw(safeAccount: Address, marketId: bigint, reserveId: bigint, amount: bigint) {
    console.log('withdraw :>> ', { safeAccount, reserveId, amount })

    const transactions: IMetaTx[] = []
    transactions.push(await this.buildWithdrawTransaction(marketId, reserveId, amount))

    const hash = await this.multicall(safeAccount, transactions)
    const tx = await (this.publicClient as PublicClient).waitForTransactionReceipt({
      hash,
    })
    console.log('multicall tx :>> ', { tx })
    return tx
  }

  public async buildActivateUserDebtTx(userAccount: Address, reserveId: bigint, chainId?: SupportedChainId) {
    const funcData = encodeFunctionData({
      abi: HealthManagerABI,
      functionName: 'activateUserDebt',
      args: [userAccount, reserveId],
    })
    const metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.healthManager,
      data: funcData,
      value: 0n,
    }
    return metaTx
  }
  public async buildBorrowTransaction(marketId: bigint, reserveId: bigint, amount: bigint, chainId?: SupportedChainId) {
    const params = encodeAbiParameters(parseAbiParameters('uint256, uint256, uint256'), [marketId, reserveId, amount])
    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'borrow',
      args: [params],
    })

    const metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: 0n,
      operation: 0,
      extra: '0x' as Hex,
    }
    return metaTx
  }
  public async borrow(
    safeAccount: Address,
    marketId: bigint,
    reserveId: bigint,
    amount: bigint
    // debtId: bigint,
  ) {
    console.log('borrow :>> ', { safeAccount, marketId, reserveId, amount })

    const transactions: IMetaTx[] = []
    // transactions.push(await this.buildActivateUserDebtTx(this.account, debtId))
    transactions.push(await this.buildBorrowTransaction(marketId, reserveId, amount))

    const hash = await this.multicall(safeAccount, transactions)
    const tx = await (this.publicClient as PublicClient).waitForTransactionReceipt({
      hash,
    })
    console.log('multicall tx :>> ', { tx })
    return tx
  }

  public async buildRepayTransaction(
    marketId: bigint,
    reserveId: bigint,
    account: Hex,
    amount: bigint,
    chainId?: SupportedChainId
  ) {
    const params = encodeAbiParameters(parseAbiParameters('uint256, uint256, address, uint256'), [
      marketId,
      reserveId,
      account,
      amount,
    ])
    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'repay',
      args: [params],
    })
    const metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: 0n,
      operation: 0,
      extra: '0x' as Hex,
    }
    return metaTx
  }
  public async repay(safeAccount: Address, marketId: bigint, reserveId: bigint, amount: bigint) {
    console.log('repay :>> ', { safeAccount, reserveId, amount })
    const lendConfig: any = Object.values(LendingConfig[this.chainId]).find((item: any) => item.reserveId === reserveId)
    const token = lendConfig.name

    const transactions: IMetaTx[] = []
    transactions.push(
      await this.buildApproveLendingTx(LendingConfig[this.chainId][token].underlyingTokenAddress, amount)
    )
    transactions.push(await this.buildRepayTransaction(marketId, reserveId, safeAccount, amount))
    const res = await this.multicall(safeAccount, transactions)
    console.log('multicall res :>> ', res)
  }
}
