import { JsonRpcSigner } from 'ethers'

import { ExtraXAccountFactory__factory } from '@/typechain-types'

import { LendingPoolConfig } from '../../config'
import { EXTRA_X_ACCOUNT_FACTORY } from '../../config/contract-id'

export function getAccountFactory(chain: string, signer: JsonRpcSigner) {
  return ExtraXAccountFactory__factory.connect(LendingPoolConfig[chain][EXTRA_X_ACCOUNT_FACTORY], signer)
}
