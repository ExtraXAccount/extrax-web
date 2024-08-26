import { Address } from 'viem'
import { create } from 'zustand'

export interface IReserveData {
  underlyingAsset: string
  name: string
  symbol: string
  decimals: bigint
  baseLTVasCollateral: bigint
  reserveLiquidationThreshold: bigint
  reserveLiquidationBonus: bigint
  reserveFactor: bigint
  usageAsCollateralEnabled: boolean
  borrowingEnabled: boolean
  stableBorrowRateEnabled: boolean
  isActive: boolean
  isFrozen: boolean
  liquidityIndex: bigint
  variableBorrowIndex: bigint
  liquidityRate: bigint
  variableBorrowRate: bigint
  stableBorrowRate: bigint
  lastUpdateTimestamp: bigint
  aTokenAddress: string
  stableDebtTokenAddress: string
  variableDebtTokenAddress: string
  interestRateStrategyAddress: string
  availableLiquidity: bigint
  totalPrincipalStableDebt: bigint
  averageStableRate: bigint
  stableDebtLastUpdateTimestamp: bigint
  totalScaledVariableDebt: bigint
  priceInMarketReferenceCurrency: bigint
  priceOracle: string
  variableRateSlope1: bigint
  variableRateSlope2: bigint
  stableRateSlope1: bigint
  stableRateSlope2: bigint
  baseStableBorrowRate: bigint
  baseVariableBorrowRate: bigint
  optimalUsageRatio: bigint
  isPaused: boolean
  isSiloedBorrowing: boolean
  accruedToTreasury: bigint
  unbacked: bigint
  isolationModeTotalDebt: bigint
  flashLoanEnabled: boolean
  debtCeiling: bigint
  debtCeilingDecimals: bigint
  eModeCategoryId: bigint
  borrowCap: bigint
  supplyCap: bigint
  eModeLtv: bigint
  eModeLiquidationThreshold: bigint
  eModeLiquidationBonus: bigint
  eModePriceSource: string
  eModeLabel: string
  borrowableInIsolation: boolean
}

export type ReadOnlyReserveData = readonly {
  readonly [key in keyof IReserveData]: IReserveData[key]
}[]

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
  historyData: any[]
  positions: ILendPosition[]
  isFetching: boolean
  currentPosition: IFormattedPosition | undefined
  currentDialogShow: 'repay' | 'borrow' | 'withdraw' | 'deposit' | null
  showEvent: boolean
}

export interface LendAction {
  updateLendPools: (lendPools: LendState['lendPools']) => void
  updateHistoryData: (historyData: LendState['historyData']) => void
  updatePositions: (balances: LendState['positions']) => void
  updateIsFetching: (isFetching: LendState['isFetching']) => void
  updateCurrentPosition: (currentPosition: LendState['currentPosition']) => void
  updateDialogShow: (currentDialogShow: LendState['currentDialogShow']) => void
  updateEventShow: (showEvent: LendState['showEvent']) => void
}

export const useLendStore = create<LendState & LendAction>((set) => ({
  lendPools: [],
  historyData: [],
  positions: [],
  isFetching: false,
  currentPosition: undefined,
  currentDialogShow: null,
  showEvent: true,

  updateLendPools: (lendPools) => set(() => ({ lendPools })),
  updateHistoryData: (historyData) => set(() => ({ historyData })),
  updatePositions: (positions) => set(() => ({ positions })),
  updateIsFetching: (isFetching) => set(() => ({ isFetching })),
  updateCurrentPosition: (currentPosition) => set(() => ({ currentPosition })),
  updateDialogShow: (currentDialogShow) => set(() => ({ currentDialogShow })),
  updateEventShow: (showEvent) => set(() => ({ showEvent })),
}))
