import { Address, Client, encodeFunctionData, getContract } from 'viem'

import { ethSignMessageForSafe } from '../utils/signMessage'
import { SafeABI } from './SafeABI'

export async function buildSignedMetaTransaction(
  publicClient: Client,
  walletClient: Client,
  userAddress: Address,
  safeAccount: Address,
  tx: { to: Address; data: Address; value: bigint },
  nonce: bigint,
) {
  console.log(`buildSignedMetaTransaction ...`)

  const safeContract = getContract({
    address: safeAccount,
    abi: SafeABI,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  // const safeEthersContract = new Contract(safeAccount, SafeABI, clientToSigner(walletClient))

  const EnumOperation = 0 // 0: call  1:delegateCall
  const safeTxGas = 0n // 0.5 M
  const baseGas = 0n
  const gasPrice = 0n
  const gasToken = '0x0000000000000000000000000000000000000000' as Address
  const refundReceiver = '0x0000000000000000000000000000000000000000' as Address

  const transactionDataHash = await safeContract.read.getTransactionHash([
    tx.to,
    tx.value,
    tx.data,
    EnumOperation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    nonce,
  ])
  console.log('TransactionDataHash:', transactionDataHash)

  // sign safe transaction
  // let signatures = await signMessageForSafe(walletClient, userAddress, transactionDataHash);
  const signatures = await ethSignMessageForSafe(walletClient, transactionDataHash)
  console.log('Signatures:', { signatures })

  // const safeTx = await safeContract.simulate.execTransaction([
  //   tx.to,
  //   tx.value,
  //   tx.data,
  //   EnumOperation,
  //   safeTxGas,
  //   baseGas,
  //   gasPrice,
  //   gasToken,
  //   refundReceiver,
  //   signatures,
  // ])
  // console.log('safeTx :>> ', safeTx);
  const encodedFuncData = encodeFunctionData({
    abi: SafeABI,
    functionName: 'execTransaction',
    args: [
      tx.to,
      tx.value,
      tx.data,
      EnumOperation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken,
      refundReceiver,
      signatures,
    ],
  })

  console.log('encodedFuncData :>> ', encodedFuncData)

  return {
    to: safeAccount,
    value: tx.value,
    data: encodedFuncData,
    operation: 0, // only 0 is allowed!
  }
  // let safeTx = await safeEthersContract.execTransaction.populateTransaction(
  //   tx.to,
  //   tx.value,
  //   tx.data,
  //   EnumOperation,
  //   safeTxGas,
  //   baseGas,
  //   gasPrice,
  //   gasToken,
  //   refundReceiver,
  //   signatures,
  //   {
  //     value: tx.value,
  //     gasLimit: 2000000,
  //   }
  // );
  // console.log('safeTx.data :>> ', safeTx.data);
  // const safeTx2 = decodeFunctionData({
  //   abi: SafeABI,
  //   data: encodedFuncData
  // })

  // return {
  //   to: safeTx.to as Address,
  //   value: safeTx.value,
  //   data: safeTx.data as Hex,
  //   operation: 0, // only 0 is allowed!
  // };
}
