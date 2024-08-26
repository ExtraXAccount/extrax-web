import { JsonRpcSigner } from 'ethers'

import { getAccountFactory } from './contract-helpers/factory'

export async function getAccounts(chain: string, signer: JsonRpcSigner, owner: string) {
  const factory = getAccountFactory(chain, signer)

  const accounts = await factory.getAccountsOfOwner(owner)

  // console.log(accounts)
  return accounts
}
