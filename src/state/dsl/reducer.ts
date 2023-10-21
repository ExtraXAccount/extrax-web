import { createSlice } from '@reduxjs/toolkit'

import { uniswapDSL } from './constants'

interface DSLState {
  showDSL: boolean
  text: string
}

const initialState: DSLState = {
  showDSL: false,
  text: uniswapDSL,
}

const dslSlice = createSlice({
  name: 'dsl',
  initialState,
  reducers: {
    setDSLText(state, { payload }) {
      state.text = payload
    },
    setShowDSL(state, { payload }) {
      state.showDSL = payload
    },
  },
})

export const { setDSLText, setShowDSL } = dslSlice.actions
export default dslSlice.reducer
