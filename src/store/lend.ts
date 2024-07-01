import { create } from 'zustand'

export interface LendState {
  healthStatus: any
  lendPools: any[]
  positions: any[]
  isFetching: boolean
}

export interface LendAction {
  updateHealthStatus: (healthStatus: LendState['healthStatus']) => void
  updateLendPools: (lendPools: LendState['lendPools']) => void
  updatePositions: (balances: LendState['positions']) => void
  updateIsFetching: (isFetching: LendState['isFetching']) => void
}

export const useLendStore = create<LendState & LendAction>((set) => ({
  healthStatus: {},
  lendPools: [],
  positions: [],
  isFetching: false,
  updateHealthStatus: (healthStatus) => set(() => ({ healthStatus: healthStatus })),
  updateLendPools: (lendPools) => set(() => ({ lendPools: lendPools })),
  updatePositions: (positions) => set(() => ({ positions: positions })),
  updateIsFetching: (isFetching) => set(() => ({ isFetching: isFetching })),
}))
