import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // poolStatus: [],
  userPositions: [],
}

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setUserPositions(state, { payload }) {
      state.userPositions = payload
    },
  },
})

export const {
  // setLendingStatus,
  setUserPositions,
  // setCurrentPool,
  // setCurrentPosition,
} = positionSlice.actions
export default positionSlice.reducer
