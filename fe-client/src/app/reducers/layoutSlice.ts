import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideBarShow: true,
  sideBarShowSmall: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    sideBarShowReducer: (state, action) => {
      state.sideBarShow = action.payload;
    },
    sideBarShowReducerSmall: (state, action) => {
      state.sideBarShowSmall = action.payload;
    },
  },
});

export default layoutSlice.reducer;
export const { sideBarShowReducer, sideBarShowReducerSmall } = layoutSlice.actions;
