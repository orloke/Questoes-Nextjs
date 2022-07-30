import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    indice: 0,
    click: false
}

const IndiceSlice = createSlice({
    name: '@indice',
    initialState,
    reducers:{
        setIndice: (state, action) => {
            state.indice = action.payload.indice
            state.click =  action.payload.click
        }
    }
})

export const { setIndice } = IndiceSlice.actions
export default IndiceSlice.reducer