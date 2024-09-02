import { UserReserveData } from '@aave/math-utils'
import { Address, Hex } from 'viem'
import { create } from 'zustand'

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

export interface IBalanceMap {
  [tokenAddress: string]: number
}

export interface AccountState {
  accounts: Address[]
  currentAccount?: Address
  healthStatus: IHealthStatus
  balanceMap: IBalanceMap
  positions: {
    userReserves: UserReserveData[]
    userEmodeCategoryId: number
  }
  showAccountLayer: boolean
}

export interface AccountAction {
  updateAccounts: (accounts: AccountState['accounts']) => void
  updateCurrentAccount: (accounts: AccountState['currentAccount']) => void
  updateHealthStatus: (healthStatus: AccountState['healthStatus']) => void
  updateBalances: (balanceMap: AccountState['balanceMap']) => void
  updatePositions: (positions: AccountState['positions']) => void
  updateAccountLayer: (supportedDebts: AccountState['showAccountLayer']) => void
}

export const useAccountStore = create<AccountState & AccountAction>((set) => ({
  accounts: [],
  currentAccount: undefined,
  healthStatus: {} as IHealthStatus,
  balanceMap: {},
  positions: {
    userReserves: [],
    userEmodeCategoryId: 0
  },
  accountInfo: undefined,
  showAccountLayer: false,

  init: ({ accounts }) =>
    set(() => ({
      accounts,
    })),
  updateAccounts: (accounts) => set(() => ({ accounts })),
  updateCurrentAccount: (currentAccount) => set(() => ({ currentAccount })),
  updateHealthStatus: (healthStatus) => set(() => ({ healthStatus })),
  updateBalances: (balanceMap) => set(() => ({ balanceMap })),
  updatePositions: (positions) => set(() => ({ positions })),
  updateAccountLayer: (showAccountLayer) => set(() => ({ showAccountLayer })),
}))
