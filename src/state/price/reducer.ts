import { createSlice } from '@reduxjs/toolkit'
interface PriceState {
  prices: {
    [symbol: string]: number
  }
  addressPrices: {
    [address: string]: {
      price: number
    }
  }
}

const initialState: PriceState = {
  prices: {
    USDC: 1,
    USDT: 1,
    // DAI: 1,
  },
  addressPrices: {},
}

const priceSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setPrices(state, { payload }) {
      state.prices = { ...state.prices, ...payload }
    },
    setAddressPrices(state, { payload }) {
      state.addressPrices = Object.assign({}, state.addressPrices, payload)
    },
  },
})

export const { setPrices, setAddressPrices } = priceSlice.actions
export default priceSlice.reducer
