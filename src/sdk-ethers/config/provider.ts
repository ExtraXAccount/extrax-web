import { JsonRpcProvider } from 'ethers'

import { RPC_URL } from './env'

export function getRPC(chain: string) {
  return RPC_URL[chain]
}

export function getProvider(chain: string) {
  return new JsonRpcProvider(RPC_URL[chain])
}
