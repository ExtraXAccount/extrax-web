import { WalletClient, bytesToHex, hexToBytes } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import { Address } from '@/types';

export async function signMessageForSafe(
  client: WalletClient,
  userAddress: Address,
  message: string
) {
  console.log('signMessageForSafe userAddress :>> ', userAddress);
  let signatures = await client.signMessage({
    account: userAddress,
    message,
  });

  let sigBytes = hexToBytes(signatures);

  if (sigBytes.length != 65) {
    console.error("!!!Invalid Signature!!!");

    return "0x";
  }

  //!!! 'v += 4' here to accommodate the validation logic of the Safe contract.
  sigBytes[64] += 4;
  signatures = bytesToHex(sigBytes);

  return signatures;
}
