import Safe, { estimateSafeTxGas } from '@safe-global/protocol-kit'
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
import { JsonRpcSigner, TransactionRequest } from 'ethers'
import { WalletClient } from 'viem'

import { clientToSigner } from '@/sdk/utils/clientToSigner'

import { sendTransaction } from '../utils'

export async function executeAccountTransaction(
  walletClient: WalletClient,
  safeAddress: string,
  transactions: TransactionRequest[]
) {
  const { account, transport } = walletClient
  const safeProtocolKit = await Safe.init({
    provider: transport,
    signer: account?.address,
    safeAddress,
  })

  const safeMetaTransactions = toSafeMetaTransactions(transactions)

  const tx = await safeProtocolKit.createTransaction({
    transactions: safeMetaTransactions,
    options: {
      // baseGas: '9000000',
      safeTxGas: '2000000',
      // gasPrice: '2000000',
    },
  })

  console.log('executeAccountTransaction :>> ', account?.address, {
    safeAddress,
    tx,
    safeMetaTransactions,
    transactions,
  })
  const signedTx = await safeProtocolKit.signTransaction(tx)
  console.log('signedTx :>> ', signedTx)

  // const safeTxGas = await estimateSafeTxGas(safeProtocolKit, signedTx)
  // console.log('safeTxGas :>> ', signedTx.data.safeTxGas)
  // signedTx.data.safeTxGas = safeTxGas
  // console.log('safeTxGas :>> ', safeTxGas)

  const receipt = await safeProtocolKit.executeTransaction(signedTx)

  console.log('receipt: ', receipt)

  const res = await (receipt.transactionResponse as any).wait()
  console.log('res :>> ', res)
  return res
}

export async function executeAccountTransactionWithEther(
  walletClient: WalletClient,
  safeAddress: string,
  transactions: TransactionRequest[],
  etherValue: string
) {
  const { account, transport } = walletClient
  const safeProtocolKit = await Safe.init({
    provider: transport,
    signer: account?.address,
    safeAddress,
  })

  const safeMetaTransactions = toSafeMetaTransactions(transactions)

  const tx = await safeProtocolKit.createTransaction({
    transactions: safeMetaTransactions,
  })

  tx.data.value = etherValue

  console.log(tx.data)

  const signedTx = await safeProtocolKit.signTransaction(tx)

  const encodedData = await safeProtocolKit.getEncodedTransaction(signedTx)
  console.log(encodedData)

  // let receipt = await safeProtocolKit.executeTransaction(signedTx, {
  //     value: etherValue
  // })

  // console.log(receipt)

  const safeTx = {
    to: safeAddress,
    data: encodedData,
    value: etherValue,
  }

  await sendTransaction(clientToSigner(walletClient)!, [safeTx])
}

function toSafeMetaTransactions(transactions: TransactionRequest[]): MetaTransactionData[] {
  return transactions.map((tx) => {
    return {
      to: tx.to!.toString(),
      data: tx.data!.toString(),
      value: tx.value ? tx.value.toString() : '0x0',
    }
  })
}
