import { UserReserveData } from '@aave/math-utils'
import { Address } from 'viem'
import { create } from 'zustand'
// import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'


export interface IBalanceMap {
  [tokenAddress: string]: number
}

export interface UserPositions {
  userReserves: UserReserveData[]
  userEmodeCategoryId: number
}

export interface AccountState {
  accounts: Address[]
  currentAccount?: Address
  balanceMap: IBalanceMap
  // positions: UserPositions
  positionsMap: {
    [account: string]: {
      userReserves: UserReserveData[]
      userEmodeCategoryId: number
    }
  }
  showAccountLayer: boolean
}

export interface AccountAction {
  updateAccounts: (accounts: AccountState['accounts']) => void
  updateCurrentAccount: (accounts: AccountState['currentAccount']) => void
  updateBalances: (balanceMap: AccountState['balanceMap']) => void
  // updatePositions: (positions: AccountState['positions']) => void
  updatePositionsMap: (positions: AccountState['positionsMap']) => void
  updateTargetPositions: (targetAccount: string, positions: UserPositions) => void
  updateAccountLayer: (supportedDebts: AccountState['showAccountLayer']) => void
}

export const useAccountStore = create<AccountState & AccountAction>()(
  immer((set) => ({
    accounts: [], // smart account list
    currentAccount: undefined,
    balanceMap: {},
    // positions: {
    //   userReserves: [],
    //   userEmodeCategoryId: 0
    // },
    positionsMap: {} as AccountState['positionsMap'],
    accountInfo: undefined,
    showAccountLayer: false,

    init: ({ accounts }) =>
      set(() => ({
        accounts,
      })),
    updateAccounts: (accounts) => set(() => ({ accounts })),
    updateCurrentAccount: (currentAccount) => set(() => ({ currentAccount })),
    updateBalances: (balanceMap) => set(() => ({ balanceMap })),
    // updatePositions: (positions) => set(() => ({ positions })),
    updatePositionsMap: (positionsMap) => set(() => ({ positionsMap })),
    updateTargetPositions: (targetAccount, positions) => set((state) => {
      state.positionsMap[targetAccount] = positions
    }),
    updateAccountLayer: (showAccountLayer) => set(() => ({ showAccountLayer })),
  }))
)
