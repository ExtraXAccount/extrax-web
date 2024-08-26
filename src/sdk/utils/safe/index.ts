import Safe from '@safe-global/protocol-kit'
import { TransactionRequest } from 'ethers'
import { PublicClient, WalletClient } from 'viem'

import { sendTransaction } from '../send-transactions'
import { estimateFee } from './../../../uniswap/math'

export async function getSafeProtocolKit(
  client: WalletClient,
  // provider,
  // signer: string,
  safeAddress: string
) {
  const { account, chain, transport } = client
  // const network = {
  //   chainId: chain?.id,
  //   name: chain?.name,
  //   ensAddress: chain?.contracts?.ensRegistry?.address,
  // }
  // const provider = new providers.Web3Provider(transport, network)
  // const signer = provider.getSigner(account.address)
  // const provider = new BrowserProvider(transport as any, network)
  // const signer = new JsonRpcSigner(provider, account?.address as string)
  // return signer

  const protocolKit = await Safe.init({
    provider: transport,
    // signer,
    safeAddress,
  })

  // protocolKit.createTransaction()
  return protocolKit
}

export async function executeAccountTransaction(
  walletClient: WalletClient,
  safeAddress: string,
  transactions: TransactionRequest[]
) {
  const { transport } = walletClient
  const safeProtocolKit = await Safe.init({
    provider: transport,
    safeAddress,
  })

  const safeMetaTransactions = toSafeMetaTransactions(transactions)

  const tx = await safeProtocolKit.createTransaction({
    transactions: safeMetaTransactions,
  })

  const signedTx = await safeProtocolKit.signTransaction(tx)

  const receipt = await safeProtocolKit.executeTransaction(signedTx)

  console.log(receipt)
}

export async function executeAccountTransactionWithEther(
  walletClient: WalletClient,
  safeAddress: string,
  transactions: TransactionRequest[],
  etherValue: string
) {
  const { transport } = walletClient
  const safeProtocolKit = await Safe.init({
    provider: transport,
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

  // await walletClient.sendTransaction(safeTx)
  // await sendTransaction(walletClient, [safeTx])
}

function toSafeMetaTransactions(transactions: TransactionRequest[]) {
  return transactions.map((tx) => {
    return {
      to: tx.to!.toString(),
      data: tx.data!.toString(),
      value: tx.value ? tx.value.toString() : '0x0',
    }
  })
}
