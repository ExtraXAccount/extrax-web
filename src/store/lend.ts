import { ComputedUserReserve, FormatReserveUSDResponse, FormatUserSummaryResponse, UserReserveData } from '@aave/math-utils'
import { Address } from 'viem'
import { create } from 'zustand'

import { PoolBaseCurrencyHumanized, ReserveDataHumanized } from '@/types/aave'

export type ReserveFormattedData = (ReserveDataHumanized & FormatReserveUSDResponse)

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

export type IFormattedLendPool = FormatReserveUSDResponse

export interface ILendPosition {
  account: Address
  debt: bigint
  liquidity: bigint
  marketId: bigint
  reserveId: bigint
}

// export interface IFormattedPosition extends ILendPosition, IFormattedLendPool {
//   type: string
//   price: number
//   value: number
//   reserve?: IFormattedLendPool
//   underlyingBalance: string
//   variableBorrows: string
//   scaledATokenBalance: string
//   scaledVariableDebt: string
// }

export interface IFormattedPosition
  extends ComputedUserReserve<FormatReserveUSDResponse> {
  type: string
  value: string
  size: string
}

// export type IFormattedPosition = FormatUserSummaryResponse<ReserveFormattedData>

export interface LendState {
  // lendPools: FormatReserveUSDResponse[]
  reservesData: {
    formattedReserves: ReserveFormattedData[]
    baseCurrencyData: PoolBaseCurrencyHumanized
  }
  historyData: any[]
  isFetching: boolean
  currentPosition: IFormattedPosition | undefined
  currentDialogShow: 'repay' | 'borrow' | 'withdraw' | 'deposit' | null
  showEvent: boolean
}

export interface LendAction {
  updateReservesData: (lendPools: LendState['reservesData']) => void
  // updateLendPools: (lendPools: LendState['lendPools']) => void
  updateHistoryData: (historyData: LendState['historyData']) => void
  updateIsFetching: (isFetching: LendState['isFetching']) => void
  updateCurrentPosition: (currentPosition: LendState['currentPosition']) => void
  updateDialogShow: (currentDialogShow: LendState['currentDialogShow']) => void
  updateEventShow: (showEvent: LendState['showEvent']) => void
}

export const useLendStore = create<LendState & LendAction>((set) => ({
  // lendPools: [],
  reservesData: {
    formattedReserves: [] as ReserveFormattedData[],
    baseCurrencyData: {} as PoolBaseCurrencyHumanized,
  },
  historyData: [],
  positions: [],
  isFetching: false,
  currentPosition: undefined,
  currentDialogShow: null,
  showEvent: true,

  updateReservesData: (reservesData) => set(() => ({ reservesData })),
  // updateLendPools: (lendPools) => set(() => ({ lendPools })),
  updateHistoryData: (historyData) => set(() => ({ historyData })),
  updateIsFetching: (isFetching) => set(() => ({ isFetching })),
  updateCurrentPosition: (currentPosition) => set(() => ({ currentPosition })),
  updateDialogShow: (currentDialogShow) => set(() => ({ currentDialogShow })),
  updateEventShow: (showEvent) => set(() => ({ showEvent })),
}))
