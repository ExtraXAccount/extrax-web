import { Address, Hex } from 'viem'
import { create } from 'zustand'

export interface AccountInfo {
  account: Hex
  balances: any
  collateral: bigint
  collateralDeciamls: number
  debt: bigint
  debtDecimals: number
  depositedVal: number
  debtVal: number
}

export interface AccountState {
  accounts: Hex[]
  balances: bigint[]
  accountInfo?: AccountInfo
  supportedAssets: any[]
  supportedDebts: any[]
}

export interface AccountAction {
  updateAccounts: (accounts: AccountState['accounts']) => void
  updateBalances: (balances: AccountState['balances']) => void
  updateAccountInfo: (accountInfo: AccountState['accountInfo']) => void
  updateSupportedAssets: (supportedAssets: AccountState['supportedAssets']) => void
  updateSupportedDebts: (supportedDebts: AccountState['supportedDebts']) => void
}

export const useAccountStore = create<AccountState & AccountAction>((set) => ({
  accounts: [],
  balances: [],
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
  updateBalances: (balances) => set(() => ({ balances: balances })),
  updateAccountInfo: (accountInfo) => set(() => ({ accountInfo: accountInfo })),
  updateSupportedAssets: (supportedAssets) =>
    set(() => ({ supportedAssets: supportedAssets })),
  updateSupportedDebts: (supportedDebts) =>
    set(() => ({ supportedDebts: supportedDebts })),
}))
