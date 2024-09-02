import { UserReserveData } from '@aave/math-utils'
import { Address, Hex } from 'viem'
import { create } from 'zustand'

export interface IBalanceMap {
  [tokenAddress: string]: number
}

export interface AccountState {
  accounts: Address[]
  currentAccount?: Address
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
  updateBalances: (balanceMap: AccountState['balanceMap']) => void
  updatePositions: (positions: AccountState['positions']) => void
  updateAccountLayer: (supportedDebts: AccountState['showAccountLayer']) => void
}

export const useAccountStore = create<AccountState & AccountAction>((set) => ({
  accounts: [], // smart account list
  currentAccount: undefined,
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
  updateBalances: (balanceMap) => set(() => ({ balanceMap })),
  updatePositions: (positions) => set(() => ({ positions })),
  updateAccountLayer: (showAccountLayer) => set(() => ({ showAccountLayer })),
}))
