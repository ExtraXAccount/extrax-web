import { WalletClient } from 'viem'

import { clientToSigner } from '@/sdk/utils/clientToSigner'

import { approve, generateTransferFromTx, generateWrapEtherTx } from '../utils'
import { executeAccountTransaction, executeAccountTransactionWithEther } from './execute-account-tx'

export async function fundAccountWithERC20(
  walletClient: WalletClient,
  account: string,
  asset: string,
  amount: string
) {
  const user = walletClient.account!.address

  // approve account to spend user's token
  await approve(clientToSigner(walletClient)!, asset, account, amount)

  const tx = generateTransferFromTx(asset, user!, account, amount)

  await executeAccountTransaction(walletClient, account, [tx])
}

export async function fundAccountWithETH(
  walletClient: WalletClient,
  chain: string,
  account: string,
  amount: string
) {
  const tx = generateWrapEtherTx(chain, amount)

  await executeAccountTransactionWithEther(walletClient, account, [tx], amount)
}
