import { JsonRpcSigner, TransactionRequest } from 'ethers'
import { WalletClient } from 'viem'

import { chainIdToName } from '@/constants/chains'
import { clientToSigner } from '@/sdk/utils/clientToSigner'

import { executeAccountTransaction } from '../safe-account'
import { sendTransaction } from '../utils'
import { getLendingPool, InterestRate } from './contract-helpers'

export async function borrowWithAccount(
  walletClient: WalletClient,
  chainId: number,
  account: string,
  reserve: string,
  amount: string,
  referralCode = '1234',
) {
  const chain = chainIdToName[chainId]
  const onBehalfOf = account

  const signer = clientToSigner(walletClient) as JsonRpcSigner
  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []

  const borrowTx = await lendingPool.borrow.populateTransaction(
    reserve,
    amount,
    InterestRate.Variable,
    referralCode,
    onBehalfOf,
  )
  transactions.push(borrowTx)

  await executeAccountTransaction(walletClient, account, transactions)
}

export async function borrowWithWallet(
  signer: JsonRpcSigner,
  chainId: number,
  reserve: string,
  amount: string,
  referralCode = '1234',
) {
  const onBehalfOf = signer.address

  const chain = chainIdToName[chainId]

  const lendingPool = getLendingPool(chain, signer)

  const transactions: TransactionRequest[] = []

  const borrowTx = await lendingPool.borrow.populateTransaction(
    reserve,
    amount,
    InterestRate.Variable,
    referralCode,
    onBehalfOf,
  )
  transactions.push(borrowTx)

  await sendTransaction(signer, transactions)
}
