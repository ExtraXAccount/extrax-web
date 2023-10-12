import { forEach } from 'lodash'

import { SupportedChainId } from './chains'

export const VAULT_CONFIG = {
  [SupportedChainId.GOERLI]: {
    'USDC-USDT-500': {
      vaultId: '2',
      vaultAddress: '0xe33A5B43F02Af7Ba318416Ab0Aac93cB8F5a3A9D',
      uniV3Pool: '0x39E1fA7825D686D8D6FE5283aA9357acA1d2080E',
      uniV3PoolMainnet: '0x7858e59e0c01ea06df3af3d20ac7b0003275d4bf',
      token0: '0x3810896D40faDd89662F8a892c6DF3a8eeB91CAB',
      token1: '0x9218f3bB9e4D5730F09e025e16B2a10547bc0161',
      uniFee: 500,
      isStable: true,
      // "debtPositionId0": 10,
      // "debtPositionId1": 11
    },
    'USDC-WETH-500': {
      vaultId: '3',
      vaultAddress: '0x0910a260e8086F545254646983Af6cbd74dF11C5',
      uniV3Pool: '0x8B1D28E6113AB4003cecDE91395dC8596cE4A571',
      uniV3PoolMainnet: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
      token0: '0x3810896D40faDd89662F8a892c6DF3a8eeB91CAB',
      token1: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      uniFee: 500,
      isStable: false,
      // "debtPositionId0": 10,
      // "debtPositionId1": 11
    },
  },
}

export function getVaultConfigByVaultId(chainId: SupportedChainId, vaultId: string) {
  const configMap = VAULT_CONFIG[chainId]
  let target
  forEach(configMap, (value, key) => {
    if (value.vaultId === vaultId) {
      target = {
        ...value,
        vaultKey: key,
      }
    }
  })
  return target
}
