import { JsonRpcSigner, TransactionRequest } from 'ethers'

export async function sendTransaction(signer: JsonRpcSigner, transactions: TransactionRequest[]) {
  const i = 0

  console.log('transactions :>> ', transactions)
  for (const tx of transactions) {
    // console.log(
    //   `\nTransaction[${i++}]`,
    //   JSON.stringify({
    //     to: tx.to?.toString(),
    //     data: tx.data?.toString(),
    //     value: tx.value?.toString(),
    //   })
    // )

    const gas = await signer.estimateGas(tx)
    tx.gasLimit = (gas * 3n) / 2n

    const resp = await signer.sendTransaction(tx)

    // console.log(resp)

    const recipt = await resp.wait()

    console.log(recipt)
    if (i === transactions.length) {
      return recipt
    }
  }
}
