import { JsonRpcSigner, toBigInt, TransactionRequest } from 'ethers'
import { WalletClient } from 'viem'

import { chainIdToName } from '@/constants/chains'
import { clientToSigner } from '@/sdk/utils/clientToSigner'
import { isWETH } from '@/sdk/utils/token'

import { ReserveAssets } from '../config/constants'
import { executeAccountTransaction, fundAccountWithERC20 } from '../safe-account'
import { approve, generateApproveTx, generateTransferFromTx } from '../utils'
import { sendTransaction } from '../utils/send-transactions'
import { getLendingPool, getWrappedTokenGateway } from './contract-helpers'

export async function depositTransactions(
  signer: JsonRpcSigner,
  user: string,
  chain: string,
  reserve: string,
  amount: string,
  usageAsCollateral: boolean,
  referralCode = '1234'
): Promise<TransactionRequest[]> {
  const onBehalfOf = user
  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []

  const approveTx = generateApproveTx(reserve, await lendingPool.getAddress(), amount)
  transactions.push(approveTx)

  const depositTx = await lendingPool.deposit.populateTransaction(reserve, amount, onBehalfOf, referralCode)

  transactions.push(depositTx)

  // console.log('transactions :>> ', transactions)
  return transactions
}

export async function depositWithAccount(
  walletClient: WalletClient,
  chainid: number,
  account: string,
  reserve: string,
  amount: string,
  usageAsCollateral = true,
  referralCode = '1234'
) {
  const chain = chainIdToName[chainid]
  const signer = clientToSigner(walletClient) as JsonRpcSigner
  const user = signer.address

  const transactions: TransactionRequest[] = []
  // const approveTx = generateApproveTx(reserve, account, amount)
  // transactions.push(approveTx)
  await approve(signer, reserve, account, amount)

  const transferTx = generateTransferFromTx(reserve, user, account, amount)
  transactions.push(transferTx)

  const depositTxes = await depositTransactions(
    signer,
    account,
    chain,
    reserve,
    amount,
    usageAsCollateral,
    referralCode
  )
  transactions.push(...depositTxes)

  await executeAccountTransaction(walletClient, account, transactions)
}

export async function depositWithWallet(
  signer: JsonRpcSigner,
  chainId: number,
  reserve: string,
  amount: string,
  usageAsCollateral = true,
  referralCode = '1234'
) {
  const isReserveWETH = isWETH(chainId, reserve)
  const fn = isReserveWETH ? depositETH : deposit
  return fn(signer, chainId, reserve, amount, usageAsCollateral, referralCode)
}

export async function deposit(
  signer: JsonRpcSigner,
  chainId: number,
  reserve: string,
  amount: string,
  usageAsCollateral = true,
  referralCode = '1234'
) {
  const user = signer.address
  const chain = chainIdToName[chainId]

  const transactions = await depositTransactions(signer, user, chain, reserve, amount, usageAsCollateral, referralCode)

  const res = await sendTransaction(signer, transactions)
  // console.log('deposit :>> ', res)
  return res
}

export async function depositETH(
  signer: JsonRpcSigner,
  chainId: number,
  amount: string,
  reservea: string,
  usageAsCollateral: boolean,
  referralCode = '1234'
) {
  const chain = chainIdToName[chainId]
  const reserve = ReserveAssets[chain]['WETH'].Reserve
  const onBehalfOf = signer.address

  const wethGateway = getWrappedTokenGateway(chain, signer)
  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []

  const depositTx = await wethGateway.depositETH.populateTransaction(
    await lendingPool.getAddress(),
    onBehalfOf,
    referralCode
  )
  depositTx.value = toBigInt(amount)
  transactions.push(depositTx)

  const setCollateralTx = await lendingPool.setUserUseReserveAsCollateral.populateTransaction(
    reserve,
    usageAsCollateral
  )
  transactions.push(setCollateralTx)

  const res = await sendTransaction(signer, transactions)
  return res
}
