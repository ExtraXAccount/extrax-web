import { forEach } from 'lodash'

import BASE_POOLS from './base'
import { SupportedChainId } from './chains'
import { VELO_V1_POOLS } from './velov1'
import { VELO_V2_POOLS } from './velov2'

export const V2_SUGAR_ADDRESS = {
  [SupportedChainId.OPTIMISM]: {
    pairs: '0x3b21531Bd00289f10C7D8B64b9389095f521A4d3',
    v1: '0x75c31cC1a815802336aa3bd3F7cACA896Afc7630',
  },
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: {
    pairs: '0x3b21531Bd00289f10C7D8B64b9389095f521A4d3',
    v1: '0x75c31cC1a815802336aa3bd3F7cACA896Afc7630',
  },
  [SupportedChainId.BASE]: {
    pairs: '0x2073D8035bB2b0F2e85aAF5a8732C6f397F9ff9b',
    v1: '0x75c31cC1a815802336aa3bd3F7cACA896Afc7630',
  },
}

export const V2_CONFIG = {
  [SupportedChainId.OPTIMISM]: {
    ...VELO_V1_POOLS,
    ...VELO_V2_POOLS,
  },
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: {
    'vAMM-WETH/USDC': {
      vaultId: '1',
      veloGauge: '0xE2CEc8aB811B648bA7B1691Ce08d5E800Dd0a60a',
      veloPair: '0x79c912FEF520be002c2B6e57EC4324e260f38E50',
      token0: '0x4200000000000000000000000000000000000006',
      token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      stable: false,
      vaultAddress: '0x53f90d4F81bA91849831E774781e6a7081d27b0d',
      rewards: [
        '0x4200000000000000000000000000000000000006',
        '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      ],
      routes: [
        [],
        [],
        [
          {
            from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
            to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            stable: false,
          },
        ],
      ],
    },

    'vAMM-VELO/USDC': {
      vaultId: '2',
      veloGauge: '0x6b8EDC43de878Fd5Cd5113C42747d32500Db3873',
      veloPair: '0xe8537b6FF1039CB9eD0B71713f697DDbaDBb717d',
      token0: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      stable: false,
      vaultAddress: '0x9E96dC0816484D878A27CA92a077a151eF9fd577',
      rewards: [
        '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
        '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      ],
      routes: [[], []],
    },
    'vAMM-OP/USDC': {
      vaultId: '3',
      veloGauge: '0x0299d40E99F2a5a1390261f5A71d13C3932E214C',
      veloPair: '0x47029bc8f5CBe3b464004E87eF9c9419a48018cd',
      token0: '0x4200000000000000000000000000000000000042',
      token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      stable: false,
      vaultAddress: '0xF2496887983C322367Cf5b381a8B29270c6e7480',
      rewards: [
        '0x4200000000000000000000000000000000000042',
        '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      ],
      routes: [
        [],
        [],
        [
          {
            from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
            to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            stable: false,
          },
        ],
      ],
    },
    'vAMM-USDC/SNX': {
      vaultId: '4',
      veloGauge: '0x099b3368eb5BBE6f67f14a791ECAeF8bC1628A7F',
      veloPair: '0x9056EB7Ca982a5Dd65A584189994e6a27318067D',
      token0: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      token1: '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
      stable: false,
      vaultAddress: '0x395757F69693E295860dA6e360682E22D12586d4',
      rewards: [
        '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
        '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      ],
      routes: [
        [],
        [],
        [
          {
            from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
            to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            stable: false,
          },
        ],
      ],
    },

    'sAMM-USDC/USX': {
      vaultId: '5',
      vaultAddress: '0xCb0cBB5Ab997255690b9078DC4931F0E75145b5b',
      veloGauge: '0xAEA343b1EF5ECfa0D252d7078425BaC047cf5d18',
      veloPair: '0x5edac6B8EA08d535c01981D75B3361481C0EE999',
      token0: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      token1: '0xbfD291DA8A403DAAF7e5E9DC1ec0aCEaCd4848B9',
      stable: true,
      rewards: [
        '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        '0xbfD291DA8A403DAAF7e5E9DC1ec0aCEaCd4848B9',
        '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      ],
      routes: [
        [],
        [],
        [
          {
            from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
            to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            stable: false,
          },
        ],
      ],
    },
  },
  [SupportedChainId.BASE]: BASE_POOLS,
}

export function getV2ConfigByVaultId(chainId: SupportedChainId, vaultId: string) {
  const configMap = V2_CONFIG[chainId]
  let target
  forEach(configMap, (value: any, key) => {
    if (value.vaultId === vaultId) {
      target = {
        ...value,
        poolKey: key,
      }
    }
  })
  return target
}
