import { ComputedUserReserve, FormatReserveUSDResponse, FormatUserSummaryResponse, UserReserveData } from '@aave/math-utils'
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

export type IFormattedLendPool = ReserveFormattedData


export interface IFormattedPosition
  extends ComputedUserReserve<FormatReserveUSDResponse> {
  type: string
  value: string
  size: string
}

export interface LendState {
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
  updateHistoryData: (historyData: LendState['historyData']) => void
  updateIsFetching: (isFetching: LendState['isFetching']) => void
  updateCurrentPosition: (currentPosition: LendState['currentPosition']) => void
  updateDialogShow: (currentDialogShow: LendState['currentDialogShow']) => void
  updateEventShow: (showEvent: LendState['showEvent']) => void
}

export const useLendStore = create<LendState & LendAction>((set) => ({
  reservesData: {
    formattedReserves: [] as ReserveFormattedData[],
    baseCurrencyData: {} as PoolBaseCurrencyHumanized,
  },
  historyData: [],
  isFetching: false,
  currentPosition: undefined,
  currentDialogShow: null,
  showEvent: true,

  updateReservesData: (reservesData) => set(() => ({ reservesData })),
  updateHistoryData: (historyData) => set(() => ({ historyData })),
  updateIsFetching: (isFetching) => set(() => ({ isFetching })),
  updateCurrentPosition: (currentPosition) => set(() => ({ currentPosition })),
  updateDialogShow: (currentDialogShow) => set(() => ({ currentDialogShow })),
  updateEventShow: (showEvent) => set(() => ({ showEvent })),
}))
