import { JsonRpcSigner } from 'ethers'

import { chainIdToName } from '@/constants/chains'

import { sendTransaction } from '../utils'
import { getAccountFactory } from './contract-helpers/factory'

export async function createAccount(signer: JsonRpcSigner, chainId: number) {
  const chain = chainIdToName[chainId]
  const factory = getAccountFactory(chain, signer)

  const createAccountTx = await factory.createAccount.populateTransaction()

  const res = await sendTransaction(signer, [createAccountTx])
  return res

  // const fil = factory.filters.AccountCreated()

  // const events = await factory.queryFilter(fil)

  // events.forEach((e) => {
  //   console.log(e)
  // })
}
