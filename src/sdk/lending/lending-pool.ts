import { SupportedChainId } from '@/constants/chains'

export const LendingConfig = {
  [SupportedChainId.OPTIMISM]: {
    WETH: {
      marketId: 1n,
      reserveId: 1n,
      name: 'WETH',
      underlyingTokenAddress: '0x4200000000000000000000000000000000000006',
      eToken: '0xdf2D12D6B1e8f221A41250Fb9865434fe5d6B11a',
      debtToken: '0xF1B580024212D21322225C0Fe50805440f2C3CcA',
      decimals: 18,
    },
    'USDC.e': {
      marketId: 1n,
      reserveId: 2n,
      name: 'USDC.e',
      underlyingTokenAddress: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      eToken: '0xf56801208f0Cea5c2af4e86BB51F83b2bd586A1f',
      debtToken: '0xbb99D220D11ad79ff2B663D78D3258692fE5c6fe',
      decimals: 6,
    },
    OP: {
      marketId: 1n,
      reserveId: 3n,
      name: 'OP',
      underlyingTokenAddress: '0x4200000000000000000000000000000000000042',
      eToken: '0x8733E2a1Ca1B09b84524474c40210a66Ef5Bff85',
      debtToken: '0xf2A98903418E1f7062788a4FA481635359826d82',
      decimals: 18,
    },
  },
} as const
