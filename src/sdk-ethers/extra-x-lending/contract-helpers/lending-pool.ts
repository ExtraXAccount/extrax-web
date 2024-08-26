import { JsonRpcSigner } from 'ethers'

import { IWrappedTokenGatewayV3__factory, Pool__factory } from '@/typechain-types'

import { LendingPoolConfig } from '../../config/constants'
import { POOL_PROXY_ID, WRAPPED_TOKEN_GATEWAY_V3 } from '../../config/contract-id'

export enum InterestRate {
  None = 0,
  Stable = 1,
  Variable = 2,
}

export function getLendingPool(chain: string, signer: JsonRpcSigner) {
  const target = LendingPoolConfig[chain][POOL_PROXY_ID]
  // console.log('getLendingPool :>> ', target)
  return Pool__factory.connect(target, signer)
}

export function getWrappedTokenGateway(chain: string, signer: JsonRpcSigner) {
  return IWrappedTokenGatewayV3__factory.connect(LendingPoolConfig[chain][WRAPPED_TOKEN_GATEWAY_V3], signer)
}
