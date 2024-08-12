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

export interface ILendPoolInfo {
  marketId: bigint
  reserveId: bigint
  availableLiquidity: bigint
  totalLiquidity: bigint
  totalDebts: bigint
  borrowingIndex: bigint
  exchangeRate: bigint
  lastUpdateTimestamp: number
  currentBorrowingRate: bigint
  underlyingAsset: Address
  eTokenAddress: Address
  debtTokenAddress: Address
  feeReceiver: Address
  interestRateConfig: IInterestRateConfig
  config: ILendPoolConfig
}

export interface IFormattedLendPool extends ILendPoolInfo {
  formatted: {
    exchangeRate: number
    apr: number
    apy: number
    borrowApr: number
    borrowApy: number
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
  }
  name: string
  tokenSymbol: string
  poolKey: string
  underlyingTokenAddress: Address
  eToken: Address
  debtToken: Address
  decimals: number
}

export interface ILendPosition {
  account: Address
  debt: bigint
  liquidity: bigint
  marketId: bigint
  reserveId: bigint
}

export interface IFormattedPosition extends ILendPosition, IFormattedLendPool {
  type: string
  price: number
  value: number
  pool?: IFormattedLendPool
}

export interface LendState {
  lendPools: ILendPoolInfo[]
  positions: ILendPosition[]
  isFetching: boolean
  currentPosition: IFormattedPosition | undefined
  currentDialogShow: 'repay' | 'borrow' | 'withdraw' | 'deposit' | null
  showEvent: boolean
}

export interface LendAction {
  updateLendPools: (lendPools: LendState['lendPools']) => void
  updatePositions: (balances: LendState['positions']) => void
  updateIsFetching: (isFetching: LendState['isFetching']) => void
  updateCurrentPosition: (currentPosition: LendState['currentPosition']) => void
  updateDialogShow: (currentDialogShow: LendState['currentDialogShow']) => void
  updateEventShow: (showEvent: LendState['showEvent']) => void
}

export const useLendStore = create<LendState & LendAction>((set) => ({
  lendPools: [],
  positions: [],
  isFetching: false,
  currentPosition: undefined,
  currentDialogShow: null,
  showEvent: true,

  updateLendPools: (lendPools) => set(() => ({ lendPools: lendPools })),
  updatePositions: (positions) => set(() => ({ positions: positions })),
  updateIsFetching: (isFetching) => set(() => ({ isFetching: isFetching })),
  updateCurrentPosition: (currentPosition) =>
    set(() => ({ currentPosition: currentPosition })),
  updateDialogShow: (currentDialogShow) =>
    set(() => ({ currentDialogShow: currentDialogShow })),
  updateEventShow: (showEvent) =>
    set(() => ({ showEvent: showEvent })),
}))
