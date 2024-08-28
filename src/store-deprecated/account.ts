import { Address, Hex } from 'viem'
import { create } from 'zustand'

export interface AccountInfo {
  account: Address
  collateral: bigint
  collateralDeciamls: number
  debt: bigint
  debtDecimals: number
  depositedVal: number
  debtVal: number
}

export interface IHealthStatus {
  collateralValue: {
    value: bigint
    decimals: number
  }
  debtValue: {
    value: bigint
    decimals: number
  }
  ltv: {
    value: bigint
    decimals: number
  }
  liquidationThreshold: {
    value: bigint
    decimals: number
  }
  healthFactor: bigint
  formatted: {
    collateralValueUsd: string
    debtValueUsd: string
    healthFactor: string
    liquidationThreshold: string // liquidate threshold of debtValue
    ltv: string // limit of debtValue
  }
}

export interface ISupportedAssets {
  assetId: bigint
  assetType: number
  underlyingTokensCalculator: Hex
  data: Hex
}

export interface ILendPosition {
  account: Address
  debt: bigint
  liquidity: bigint
  marketId: bigint
  reserveId: bigint
}

export interface AccountState {
  accounts: Address[]
  currentAccount?: Address
  healthStatus: IHealthStatus
  balances: bigint[]
  positions: ILendPosition[]
  accountInfo?: AccountInfo
  supportedAssets: ISupportedAssets[]
  supportedDebts: ISupportedAssets[]
  showAccountLayer: boolean
}

export interface AccountAction {
  updateAccounts: (accounts: AccountState['accounts']) => void
  updateCurrentAccount: (accounts: AccountState['currentAccount']) => void
  updateHealthStatus: (healthStatus: AccountState['healthStatus']) => void
  updateBalances: (balances: AccountState['balances']) => void
  updatePositions: (balances: AccountState['positions']) => void
  updateAccountInfo: (accountInfo: AccountState['accountInfo']) => void
  updateSupportedAssets: (supportedAssets: AccountState['supportedAssets']) => void
  updateSupportedDebts: (supportedDebts: AccountState['supportedDebts']) => void
  updateAccountLayer: (supportedDebts: AccountState['showAccountLayer']) => void
}

export const useAccountStore = create<AccountState & AccountAction>((set) => ({
  accounts: [],
  currentAccount: undefined,
  healthStatus: {} as IHealthStatus,
  balances: [],
  positions: [],
  accountInfo: undefined,
  supportedAssets: [],
  supportedDebts: [],
  showAccountLayer: false,

  init: ({ accounts, supportedAssets, supportedDebts }) =>
    set(() => ({
      accounts,
      supportedAssets,
      supportedDebts,
    })),
  updateAccounts: (accounts) => set(() => ({ accounts })),
  updateCurrentAccount: (currentAccount) => set(() => ({ currentAccount })),
  updateHealthStatus: (healthStatus) => set(() => ({ healthStatus })),
  updateBalances: (balances) => set(() => ({ balances })),
  updatePositions: (positions) => set(() => ({ positions })),
  updateAccountInfo: (accountInfo) => set(() => ({ accountInfo })),
  updateSupportedAssets: (supportedAssets) => set(() => ({ supportedAssets })),
  updateSupportedDebts: (supportedDebts) => set(() => ({ supportedDebts })),
  updateAccountLayer: (showAccountLayer) => set(() => ({ showAccountLayer })),
}))
