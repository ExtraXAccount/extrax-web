import { BigNumber } from '@ethersproject/bignumber'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // poolStatus: [],
  userPositions: [
    // {
    //   poolKey: 'WETH/USDC',
    //   token0: 'WETH',
    //   token1: 'USDC',
    //   totalPositionValue: 120.36,
    //   token0Amount: BigNumber.from(((60.18 / 1621) * 100000).toFixed(0)).mul(BigNumber.from(`10000000000000`)),
    //   token1Amount: BigNumber.from(60.18 * 100000).mul(BigNumber.from(`10000000000000`)),
    //   token0Debt: BigNumber.from(`0`),
    //   token1Debt: BigNumber.from(120.36 * 100000).mul(BigNumber.from(`10000000000000`)),
    //   apr: 26.3,
    // },
  ],
}

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setUserPositions(state, { payload }) {
      state.userPositions = payload
    },
    addUserPositions(state, { payload }) {
      state.userPositions.push(payload)
    },
  },
})

export const {
  // setLendingStatus,
  setUserPositions,
  addUserPositions,
  // setCurrentPool,
  // setCurrentPosition,
} = positionSlice.actions
export default positionSlice.reducer
