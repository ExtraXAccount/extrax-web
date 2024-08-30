import { JsonRpcSigner, TransactionRequest } from 'ethers'
import { WalletClient } from 'viem'

import { clientToSigner } from '@/sdk/utils/clientToSigner'

import { executeAccountTransaction } from '../safe-account'
import { generateApproveTx, sendTransaction } from '../utils'
import { getLendingPool, InterestRate } from './contract-helpers'

export async function repayWithAccount(
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

  const approveTx = generateApproveTx(reserve, await lendingPool.getAddress(), amount)
  transactions.push(approveTx)

  const repayTx = await lendingPool.repay.populateTransaction(
    reserve,
    amount,
    InterestRate.Variable,
    onBehalfOf
  )
  transactions.push(repayTx)

  return executeAccountTransaction(walletClient, account, transactions)
}

export async function repay(signer: JsonRpcSigner, chain: string, reserve: string, amount: string) {
  const onBehalfOf = signer.address

  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []

  const approveTx = generateApproveTx(reserve, await lendingPool.getAddress(), amount)
  transactions.push(approveTx)

  const repayTx = await lendingPool.repay.populateTransaction(
    reserve,
    amount,
    InterestRate.Variable,
    onBehalfOf
  )
  transactions.push(repayTx)

  return sendTransaction(signer, transactions)
}
