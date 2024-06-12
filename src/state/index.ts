import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import dsl from './dsl/reducer'
import lending from './lending/reducer'
import position from './position/reducer'
import price from './price/reducer'

const store = configureStore({
  reducer: {
    lending,
    dsl,
    price,
    position,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export default store
