import { find } from 'lodash'

import { defaultChainId } from '.'
import { SupportedChainId } from './chains'

export const TOKEN_LIST = {
  [SupportedChainId.OPTIMISM]: {
    fBOMB: {
      name: 'fBOMB',
      address: '0x74ccbe53F77b08632ce0CB91D3A545bF6B8E0979',
      decimals: 18,
    },
    PERP: {
      name: 'PERP',
      address: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0',
      decimals: 18,
    },
    MTA: {
      name: 'MTA',
      address: '0x929B939f8524c3Be977af57A4A0aD3fb1E374b50',
      decimals: 18,
    },
    GNode: {
      name: 'GNode',
      address: '0x5976d4c3bcFc1c5f90aB1419D7f3dDF109cEA35a',
      decimals: 18,
    },
    wUSDRV3: {
      name: 'wUSDR',
      address: '0xC03b43d492d904406db2d7D57e67C7e8234bA752',
      decimals: 9,
    },
    TAROTV2: {
      name: 'TAROT',
      address: '0x1F514A61bcde34F94Bc39731235690ab9da737F7',
      decimals: 18,
    },
    tBTC: {
      name: 'tBTC',
      address: '0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40',
      decimals: 18,
    },
    WBTC: {
      name: 'WBTC',
      address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
      decimals: 8,
    },
    UNIDX: {
      name: 'UNIDX',
      address: '0x28b42698Caf46B4B012CF38b6C75867E0762186D',
      decimals: 18,
    },
    TAROT: {
      name: 'TAROT',
      address: '0x375488F097176507e39B9653b88FDc52cDE736Bf',
      decimals: 18,
    },
    agEUR: {
      name: 'agEUR',
      address: '0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED',
      decimals: 18,
    },
    LUSD: {
      name: 'LUSD',
      address: '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819',
      decimals: 18,
    },
    WLD: {
      name: 'WLD',
      address: '0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1',
      decimals: 18,
    },
    EXA: {
      name: 'EXA',
      address: '0x1e925De1c68ef83bD98eE3E130eF14a50309C01B',
      decimals: 18,
    },
    BLU: {
      name: 'BLU',
      address: '0xa50B23cDfB2eC7c590e84f403256f67cE6dffB84',
      decimals: 18,
    },
    RED: {
      name: 'RED',
      address: '0x3417E54A51924C225330f8770514aD5560B9098D',
      decimals: 18,
    },
    msETH: {
      name: 'msETH',
      address: '0x1610e3c85dd44Af31eD7f33a63642012Dca0C5A5',
      decimals: 18,
    },
    alETH: {
      name: 'alETH',
      address: '0x3E29D3A9316dAB217754d13b28646B76607c5f04',
      decimals: 18,
    },
    VELOV2: {
      name: 'VELO',
      address: '0x9560e827af36c94d2ac33a39bce1fe78631088db',
      decimals: 18,
    },
    EXTRA: {
      name: 'EXTRA',
      address: '0x2dad3a13ef0c6366220f989157009e501e7938f8',
      decimals: 18,
    },
    veEXTRA: {
      name: 'veEXTRA',
      address: '0xe0BeC4F45aEF64CeC9dCB9010d4beFfB13e91466',
      decimals: 18,
    },
    wUSDR: {
      name: 'wUSDR',
      address: '0x340fE1D898ECCAad394e2ba0fC1F93d27c7b717A',
      decimals: 9,
    },
    frxETH: {
      name: 'frxETH',
      address: '0x6806411765Af15Bddd26f8f544A34cC40cb9838B',
      decimals: 18,
    },
    wstETH: {
      name: 'wstETH',
      address: '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb',
      decimals: 18,
    },
    SONNE: {
      name: 'SONNE',
      address: '0x1DB2466d9F5e10D7090E7152B68d62703a2245F0',
      decimals: 18,
    },
    LYRA: {
      name: 'LYRA',
      address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
      decimals: 18,
    },
    alUSD: {
      name: 'alUSD',
      address: '0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A',
      decimals: 18,
    },
    KWENTA: {
      name: 'KWENTA',
      address: '0x920Cf626a271321C151D027030D5d08aF699456b',
      decimals: 18,
    },
    'USD+': {
      name: 'USD+',
      address: '0x73cb180bf0521828d8849bc8CF2B920918e23032',
      decimals: 6,
    },
    STG: {
      name: 'STG',
      address: '0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97',
      decimals: 18,
    },
    VELO: {
      name: 'VELO',
      address: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      decimals: 18,
    },
    WETH: {
      name: 'WETH',
      address: '0x4200000000000000000000000000000000000006',
      decimals: 18,
    },
    // OP: {
    //   name: 'OP',
    //   address: '0x4200000000000000000000000000000000000042',
    //   decimals: 18,
    // },
    UNI: {
      name: 'UNI',
      address: '0x4200000000000000000000000000000000000042',
      decimals: 18,
    },
    USDC: {
      name: 'USDC',
      address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      decimals: 6,
    },
    USDT: {
      name: 'USDT',
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      decimals: 6,
    },
    SNX: {
      name: 'SNX',
      address: '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
      decimals: 18,
    },
    DOLA: {
      name: 'DOLA',
      address: '0x8aE125E8653821E851F12A49F7765db9a9ce7384',
      decimals: 18,
    },
    sUSD: {
      name: 'sUSD',
      address: '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
      decimals: 18,
    },
    MAI: {
      name: 'MAI',
      address: '0xdFA46478F9e5EA86d57387849598dbFB2e964b02',
      decimals: 18,
    },
    DAI: {
      name: 'DAI',
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      decimals: 18,
    },
    USX: {
      name: 'USX',
      address: '0xbfD291DA8A403DAAF7e5E9DC1ec0aCEaCd4848B9',
      decimals: 18,
    },
    DHT: {
      name: 'DHT',
      address: '0xAF9fE3B5cCDAe78188B1F8b9a49Da7ae9510F151',
      decimals: 18,
    },
    THALES: {
      name: 'THALES',
      address: '0x217D47011b23BB961eB6D93cA9945B7501a5BB11',
      decimals: 18,
    },
    BOB: {
      name: 'BOB',
      address: '0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B',
      decimals: 18,
    },
    FRAX: {
      name: 'FRAX',
      address: '0x2E3D870790dC77A83DD1d18184Acc7439A53f475',
      decimals: 18,
    },
    'DAI+': {
      name: 'DAI+',
      address: '0x970D50d09F3a656b43E11B0D45241a84e3a6e011',
      decimals: 18,
    },
    ERN: {
      name: 'ERN',
      address: '0xc5b001DC33727F8F26880B184090D3E252470D45',
      decimals: 18,
    },
    CHI: {
      name: 'CHI',
      address: '0xCa0E54b636DB823847B29F506BFFEE743F57729D',
      decimals: 18,
    },
    msUSD: {
      name: 'msUSD',
      address: '0x9dabae7274d28a45f0b65bf8ed201a5731492ca0',
      decimals: 18,
    },
  },
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: {
    EXTRA: {
      name: 'EXTRA',
      address: '0xAeA8384088Eb1a98E555D8B5C8aaA953087716f0',
      decimals: 18,
    },
    veEXTRA: {
      name: 'veEXTRA',
      address: '0xe0BeC4F45aEF64CeC9dCB9010d4beFfB13e91466',
      decimals: 18,
    },
    USDC: {
      name: 'USDC',
      address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      decimals: 6,
    },
    OP: {
      name: 'OP',
      address: '0x4200000000000000000000000000000000000042',
      decimals: 18,
    },
    WETH: {
      name: 'WETH',
      address: '0x4200000000000000000000000000000000000006',
      decimals: 18,
    },
    VELO: {
      name: 'VELO',
      address: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      decimals: 18,
    },
    SNX: {
      name: 'SNX',
      address: '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
      decimals: 18,
    },
    USX: {
      name: 'USX',
      address: '0xbfD291DA8A403DAAF7e5E9DC1ec0aCEaCd4848B9',
      decimals: 18,
    },
    'USD+': {
      name: 'USD+',
      address: '0x73cb180bf0521828d8849bc8CF2B920918e23032',
      decimals: 6,
    },
    STG: {
      name: 'STG',
      address: '0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97',
      decimals: 18,
    },
    DHT: {
      name: 'DHT',
      address: '0xAF9fE3B5cCDAe78188B1F8b9a49Da7ae9510F151',
      decimals: 18,
    },
    THALES: {
      name: 'THALES',
      address: '0x217D47011b23BB961eB6D93cA9945B7501a5BB11',
      decimals: 18,
    },
    BOB: {
      name: 'BOB',
      address: '0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B',
      decimals: 18,
    },
    FRAX: {
      name: 'FRAX',
      address: '0x2E3D870790dC77A83DD1d18184Acc7439A53f475',
      decimals: 18,
    },
    'DAI+': {
      name: 'DAI+',
      address: '0x970D50d09F3a656b43E11B0D45241a84e3a6e011',
      decimals: 18,
    },
    ERN: {
      name: 'ERN',
      address: '0xc5b001DC33727F8F26880B184090D3E252470D45',
      decimals: 18,
    },
    CHI: {
      name: 'CHI',
      address: '0xCa0E54b636DB823847B29F506BFFEE743F57729D',
      decimals: 18,
    },
  },
  [SupportedChainId.BASE]: {
    WETH: {
      name: 'WETH',
      address: '0x4200000000000000000000000000000000000006',
      decimals: 18,
    },
    USDbC: {
      name: 'USDbC',
      address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
      decimals: 6,
    },
    AERO: {
      name: 'AERO',
      address: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
      decimals: 18,
    },
    EXTRA: {
      name: 'EXTRA',
      address: '0x2dAD3a13ef0C6366220f989157009e501e7938F8',
      decimals: 18,
    },
    TAROT: {
      name: 'TAROT',
      address: '0xF544251D25f3d243A36B07e7E7962a678f952691',
      decimals: 18,
    },
    wUSDR: {
      name: 'wUSDR',
      address: '0x9483ab65847A447e36d21af1CaB8C87e9712ff93',
      decimals: 9,
    },
    DOLA: {
      name: 'DOLA',
      address: '0x4621b7a9c75199271f773ebd9a499dbd165c3191',
      decimals: 18,
    },
    ERN: {
      name: 'ERN',
      address: '0xa334884bf6b0a066d553d19e507315e839409e62',
      decimals: 18,
    },
    STG: {
      name: 'STG',
      address: '0xe3b53af74a4bf62ae5511055290838050bf764df',
      decimals: 18,
    },
    'DAI+': {
      name: 'DAI+',
      address: '0x65a2508C429a6078a7BC2f7dF81aB575BD9D9275',
      decimals: 18,
    },
    'USD+': {
      name: 'USD+',
      address: '0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376',
      decimals: 6,
    },
    cbETH: {
      name: 'cbETH',
      address: '0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22',
      decimals: 18,
    },
    SONNE: {
      name: 'SONNE',
      address: '0x22a2488fe295047ba13bd8cccdbc8361dbd8cf7c',
      decimals: 18,
    },
    tBTC: {
      name: 'tBTC',
      address: '0x236aa50979d5f3de3bd1eeb40e81137f22ab794b',
      decimals: 18,
    },
    MAI: {
      name: 'MAI',
      address: '0xbf1aea8670d2528e08334083616dd9c5f3b087ae',
      decimals: 18,
    },
    YFX: {
      name: 'YFX',
      address: '0x8901cb2e82cc95c01e42206f8d1f417fe53e7af0',
      decimals: 18,
    },
    UNIDX: {
      name: 'UNIDX',
      address: '0x6b4712ae9797c199edd44f897ca09bc57628a1cf',
      decimals: 18,
    },
    agEUR: {
      name: 'agEUR',
      address: '0xa61beb4a3d02decb01039e378237032b351125b4',
      decimals: 18,
    },
    DEUS: {
      name: 'DEUS',
      address: '0xde5ed76e7c05ec5e4572cfc88d1acea165109e44',
      decimals: 18,
    },
    BASED: {
      name: 'BASED',
      address: '0x9cbd543f1b1166b2df36b68eb6bb1dce24e6abdf',
      decimals: 18,
    },
    WELL: {
      name: 'WELL',
      address: '0xff8adec2221f9f4d8dfbafa6b9a297d17603493d',
      decimals: 18,
    },
    USDC: {
      name: 'USDC',
      address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
      decimals: 6,
    },
    OVN: {
      name: 'OVN',
      address: '0xa3d1a8deb97b111454b294e2324efad13a9d8396',
      decimals: 18,
    },
  },
}

export function getTokenConfigByAddress(chainId: SupportedChainId, address: string) {
  const configMap = TOKEN_LIST[chainId || defaultChainId]
  const target = find(configMap, (value, key) => {
    return value.address?.toLowerCase() === address?.toLowerCase()
  })
  return target
}
