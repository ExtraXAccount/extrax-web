import { Address } from 'viem'
import { create } from 'zustand'

export interface IInterestRateConfig {
  borrowingRateA: number
  borrowingRateB: number
  maxBorrowingRate: number
  utilizationA: number
  utilizationB: number
}

export interface ILendPoolConfig {
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

export interface IFormattedLendPool {
  apr: number
  borrowApr: number
  tokenSymbol: string
  poolKey: string
  totalSupply: number
  supplyCap: number
  totalBorrowed: number
  borrowCap: number
  availableLiquidity: number
  utilization: number
  balance: number
  deposited: number
  borrowed: number
  depositedBal: number
  borrowedBal: number
  marketId: bigint
  reserveId: bigint
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
  name: string
  underlyingTokenAddress: Address
  eToken: Address
  debtToken: Address
  decimals: number
}

export interface ILendPosition {
  // account: string
  debt: bigint
  liquidity: bigint
  marketId: bigint
  reserveId: bigint
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
  positions: ILendPosition[]
  isFetching: boolean
  currentPosition: ILendPosition | undefined
  currentDialogShow: 'repay' | 'borrow' | 'withdraw' | 'deposit' | null
}

export interface LendAction {
  updateHealthStatus: (healthStatus: LendState['healthStatus']) => void
  updateLendPools: (lendPools: LendState['lendPools']) => void
  updatePositions: (balances: LendState['positions']) => void
  updateIsFetching: (isFetching: LendState['isFetching']) => void
  updateCurrentPosition: (currentPosition: LendState['currentPosition']) => void
  updateDialogShow: (currentDialogShow: LendState['currentDialogShow']) => void
}

export const useLendStore = create<LendState & LendAction>((set) => ({
  healthStatus: {},
  lendPools: [],
  positions: [],
  isFetching: false,
  currentPosition: undefined,
  currentDialogShow: null,
  updateHealthStatus: (healthStatus) => set(() => ({ healthStatus: healthStatus })),
  updateLendPools: (lendPools) => set(() => ({ lendPools: lendPools })),
  updatePositions: (positions) => set(() => ({ positions: positions })),
  updateIsFetching: (isFetching) => set(() => ({ isFetching: isFetching })),
  updateCurrentPosition: (currentPosition) =>
    set(() => ({ currentPosition: currentPosition })),
  updateDialogShow: (currentDialogShow) =>
    set(() => ({ currentDialogShow: currentDialogShow })),
}))
