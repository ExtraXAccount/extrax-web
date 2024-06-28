import { create } from 'zustand'

export interface LendState {
  lendPools: any[]
  isFetching: boolean
}

export interface LendAction {
  updateLendPools: (lendPools: LendState['lendPools']) => void
  updateIsFetching: (isFetching: LendState['isFetching']) => void
}

export const useLendStore = create<LendState & LendAction>((set) => ({
  lendPools: [],
  isFetching: false,
  updateLendPools: (lendPools) => set(() => ({ lendPools: lendPools })),
  updateIsFetching: (isFetching) => set(() => ({ isFetching: isFetching })),
}))
