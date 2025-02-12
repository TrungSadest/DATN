import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    controPan: 0
}

const triggerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        triggerControPanFun: (state, action) => {
            state.controPan = action.payload
        }
    }
})

export default triggerSlice.reducer
export const { triggerControPanFun } = triggerSlice.actions