import { WalletClient, encodeFunctionData, erc20Abi, getContract, PublicClient, Client, Address } from 'viem'
import { signMessageForSafe } from "../utils/signMessage";
import { SafeABI } from './SafeABI';

export async function buildSignedMetaTransaction(
  publicClient: Client,
  walletClient: Client,
  userAddress: Address,
  account: Address,
  tx: { to: Address; data: Address; value: bigint },
  nonce: bigint
) {
  console.log(`buildSignedMetaTransaction ...`);

  const safeContract = getContract({
    address: account,
    abi: SafeABI,
    client: {
      public: publicClient,
      wallet: walletClient,
    }
  })

  let EnumOperation = 0; // 0: call  1:delegateCall
  let safeTxGas = 500000n; // 0.5 M
  let baseGas = 0n;
  let gasPrice = 0n;
  let gasToken = "0x0000000000000000000000000000000000000000" as Address;
  let refundReceiver = "0x0000000000000000000000000000000000000000" as Address;

  let transactionDataHash = await safeContract.read.getTransactionHash([
    tx.to,
    tx.value,
    tx.data,
    EnumOperation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    nonce
  ]);
  // console.log("\t TransactionDataHash:", transactionDataHash);

  // sign safe transaction
  let signatures = await signMessageForSafe(walletClient, userAddress, transactionDataHash);
  // console.log("\t Signatures:", signatures);

  const safeTx = encodeFunctionData({
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

  // let safeTx = await safeContract.write.execTransaction.populateTransaction(
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

  return {
    to: tx.to,
    value: tx.value,
    data: safeTx,
    operation: 0, // only 0 is allowed!
  };
}
