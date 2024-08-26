import { TransactionRequest, Wallet } from 'ethers'

export async function sendTransaction(wallet: Wallet, transactions: TransactionRequest[]) {
  let i = 0

  for (const tx of transactions) {
    console.log(
      `\nTransaction[${i++}]`,
      JSON.stringify({
        to: tx.to!.toString(),
        data: tx.data!.toString(),
        value: tx.value?.toString(),
      })
    )

    const gas = await wallet.estimateGas(tx)
    tx.gasLimit = (gas * 3n) / 2n

    const resp = await wallet.sendTransaction(tx)

    console.log(resp)

    const recipt = await resp.wait()

    console.log(recipt)
  }
}
