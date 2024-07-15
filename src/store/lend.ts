import { create } from 'zustand'

interface IInterestRateConfig {
  borrowingRateA: number
  borrowingRateB: number
  maxBorrowingRate: number
  utilizationA: number
  utilizationB: number
}

interface ILendPoolConfig {
  paused: boolean
  frozen: boolean
  borrowEnabled: boolean
  collateralEnabled: boolean
  LTV: number
  liquidationThreshold: number
  liquidationBonus: number
  borrowCap: bigint
  colddownTime: bigint
  liquidationProtocolFee: number
  reserveProtocoalFee: number
  supplyCap: bigint
}

export interface LendState {
  healthStatus: any
  lendPools: {
    marketId: bigint
    reserveId: bigint
    availableLiquidity: bigint
    totalLiquidity: bigint
    totalDebts: bigint
    borrowingIndex: bigint
    exchangeRate: bigint
    lastUpdateTimestamp: number
    currentBorrowingRate: bigint
    underlyingAsset: string
    eTokenAddress: string
    debtTokenAddress: string
    feeReceiver: string
    interestRateConfig: IInterestRateConfig
    config: ILendPoolConfig
  }[]
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
