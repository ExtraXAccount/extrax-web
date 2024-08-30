import { JsonRpcSigner, TransactionRequest } from 'ethers'
import { WalletClient } from 'viem'

import { clientToSigner } from '@/sdk/utils/clientToSigner'

import { executeAccountTransaction } from '../safe-account'
import { sendTransaction } from '../utils'
import { getLendingPool } from './contract-helpers'

export async function withdrawWithAccount(
  walletClient: WalletClient,
  chain: string,
  account: string,
  reserve: string,
  amount: string
) {
  const signer = clientToSigner(walletClient) as JsonRpcSigner
  const onBehalfOf = account

  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []
  const withdrawTx = await lendingPool.withdraw.populateTransaction(reserve, amount, onBehalfOf)
  transactions.push(withdrawTx)

  await executeAccountTransaction(walletClient, account, transactions)
}

export async function withdraw(
  signer: JsonRpcSigner,
  chain: string,
  reserve: string,
  amount: string
) {
  const onBehalfOf = signer.address

  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []
  const withdrawTx = await lendingPool.withdraw.populateTransaction(reserve, amount, onBehalfOf)
  transactions.push(withdrawTx)

  await sendTransaction(signer, transactions)
}
