import { Address, Hex } from 'viem'
import { create } from 'zustand'

export interface AccountInfo {
  account: Address
  balances: any
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
  supportedAssets: any[]
  supportedDebts: any[]
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

  init: ({ accounts, supportedAssets, supportedDebts }) =>
    set(() => ({
      accounts: accounts,
      supportedAssets: supportedAssets,
      supportedDebts: supportedDebts,
    })),
  updateAccounts: (accounts) => set(() => ({ accounts: accounts })),
  updateCurrentAccount: (account) => set(() => ({ currentAccount: account })),
  updateHealthStatus: (healthStatus) => set(() => ({ healthStatus: healthStatus })),
  updateBalances: (balances) => set(() => ({ balances: balances })),
  updatePositions: (positions) => set(() => ({ positions: positions })),
  updateAccountInfo: (accountInfo) => set(() => ({ accountInfo: accountInfo })),
  updateSupportedAssets: (supportedAssets) =>
    set(() => ({ supportedAssets: supportedAssets })),
  updateSupportedDebts: (supportedDebts) =>
    set(() => ({ supportedDebts: supportedDebts })),
}))
