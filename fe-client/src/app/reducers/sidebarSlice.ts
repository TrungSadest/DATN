import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    menus: []
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setMenus: (state, action) => {
            state.menus = action.payload
        }
    }
})

export default sidebarSlice.reducer
export const { setMenus } = sidebarSlice.actions