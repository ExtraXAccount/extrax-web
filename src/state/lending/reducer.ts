import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  poolStatus: [],
  userPositions: [],
}

const lendingSlice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    setLendingStatus(state, { payload }) {
      state.poolStatus = payload
    },
    setUserPositions(state, { payload }) {
      state.userPositions = payload
    },
  },
})

export const {
  setLendingStatus,
  setUserPositions,
  // setCurrentPool,
  // setCurrentPosition,
} = lendingSlice.actions
export default lendingSlice.reducer
