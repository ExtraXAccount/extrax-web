import { createSlice } from '@reduxjs/toolkit'

interface DSLState {
  text: string
}

const initialState: DSLState = {
  text: `@Borrow 500 $USDC
@Borrow 0.9 $WETH
@Farm POOL UniswapV3 WETH/USDC with RANGE -10% +10%
@AutoCompound`,
}

const dslSlice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    setDSLText(state, { payload }) {
      state.text = payload
    },
  },
})

export const { setDSLText } = dslSlice.actions
export default dslSlice.reducer
