import { JsonRpcSigner, TransactionRequest } from 'ethers'
import { WalletClient } from 'viem'

import { chainIdToName } from '@/constants/chains'
import { clientToSigner } from '@/sdk/utils/clientToSigner'

import { executeAccountTransaction } from '../safe-account'
import { sendTransaction } from '../utils/send-transactions'
import { getLendingPool } from './contract-helpers'

export async function setEModeTransactions(
  signer: JsonRpcSigner,
  chain: string,
  categoryId: number
): Promise<TransactionRequest[]> {
  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []

  const setEModeTx = await lendingPool.setUserEMode.populateTransaction(
    categoryId
  )

  transactions.push(setEModeTx)

  return transactions
}

export async function setEModeWithAccount(
  walletClient: WalletClient,
  chainId: number,
  account: string,
  categoryId: number,
) {
  const chain = chainIdToName[chainId]
  const signer = clientToSigner(walletClient) as JsonRpcSigner

  const transactions: TransactionRequest[] = []

  const setEModeTxes = await setEModeTransactions(
    signer,
    chain,
    categoryId,
  )
  transactions.push(...setEModeTxes)

  await executeAccountTransaction(walletClient, account, transactions)
}

export async function setEModeWithWallet(
  signer: JsonRpcSigner,
  chainId: number,
  categoryId: number,
) {
  const chain = chainIdToName[chainId]

  const transactions = await setEModeTransactions(
    signer,
    chain,
    categoryId
  )

  const res = await sendTransaction(signer, transactions)
  return res
}
