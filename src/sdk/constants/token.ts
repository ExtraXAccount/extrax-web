import { find } from 'lodash'

import { SupportedChainId } from './chains'

export const TOKEN_LIST = {
  [SupportedChainId.GOERLI]: {
    USDC: {
      name: 'USDC',
      address: '0x3810896D40faDd89662F8a892c6DF3a8eeB91CAB',
      decimals: 18,
    },
    USDT: {
      name: 'USDT',
      address: '0x9218f3bB9e4D5730F09e025e16B2a10547bc0161',
      decimals: 18,
    },
    WETH: {
      name: 'WETH',
      address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      decimals: 18,
    },
  },
  [SupportedChainId.MAINNET]: {
    USDC: {
      name: 'USDC',
      address: '0x3810896D40faDd89662F8a892c6DF3a8eeB91CAB',
    },
    USDT: {
      name: 'USDT',
      address: '0x9218f3bB9e4D5730F09e025e16B2a10547bc0161',
    },
    WETH: {
      name: 'WETH',
      address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    },
  },
}

export function getTokenConfigByAddress(chainId: SupportedChainId, address: string) {
  const configMap = TOKEN_LIST[chainId]
  const target = find(configMap, (value, key) => {
    return value.address === address
  })
  return target
}
