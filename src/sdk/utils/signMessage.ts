import { hexlify } from 'ethers'
import { bytesToHex, Hex, hexToBytes, WalletClient } from 'viem'

import { Address } from '@/types'

import { clientToSigner } from './clientToSigner'
import { hexToUint8Array } from './hex'

export async function signMessageForSafe(client: WalletClient, userAddress: Address, message: string) {
  console.log('signMessageForSafe userAddress :>> ', userAddress)
  let signatures = await client.signMessage({
    account: userAddress,
    message,
  })

  const sigBytes = hexToBytes(signatures)

  if (sigBytes.length != 65) {
    console.error('!!!Invalid Signature!!!')

    return '0x'
  }

  //!!! 'v += 4' here to accommodate the validation logic of the Safe contract.
  sigBytes[64] += 4
  signatures = bytesToHex(sigBytes)

  return signatures
}

export async function ethSignMessageForSafe(walletClient: WalletClient, hex: Hex) {
  const signer = clientToSigner(walletClient)
  const bytes = hexToUint8Array(hex)
  console.log('signer :>> ', { signer, bytes })

  let signatures = await signer.signMessage(bytes)

  const sigBytes = hexToUint8Array(signatures)

  if (sigBytes.length != 65) {
    console.error('!!!Invalid Signature!!!')

    // return "";
    throw new Error('!!!Invalid Signature!!!')
  }

  //!!! 'v += 4' here to accommodate the validation logic of the Safe contract.
  sigBytes[64] += 4
  signatures = hexlify(sigBytes)

  return signatures as Hex
}
