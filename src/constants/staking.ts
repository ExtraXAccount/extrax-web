import { SupportedChainId } from './chains'

export const STAKING_CONFIG = {
  [SupportedChainId.OPTIMISM]: {
    address: '0x2dAD3a13ef0C6366220f989157009e501e7938F8',
    decimals: 18,
    symbol: 'EXTRA',
    name: 'EXTRA',
  },
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: {
    address: '0xAeA8384088Eb1a98E555D8B5C8aaA953087716f0',
    decimals: 18,
    symbol: 'EXTRA',
    name: 'EXTRA',
  },
}
