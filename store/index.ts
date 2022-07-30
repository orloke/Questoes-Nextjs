import { configureStore } from "@reduxjs/toolkit";
import IndiceSlice from './Questao'

export const store = configureStore({
    reducer:{
        IndiceSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch