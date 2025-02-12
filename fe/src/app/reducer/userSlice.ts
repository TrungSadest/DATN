import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HeadersUtil } from '../util/headersUtil';
import Cookies from 'universal-cookie';
import { AuthConstant } from '../constant/authConstant';

const cookie = new Cookies();

const initialState: any = {
  userInfo: {},
  isLogin: cookie.get(AuthConstant.ACCESS_TOKEN) !== undefined && cookie.get(AuthConstant.ACCESS_TOKEN) !== '',
};

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  return axios.get(process.env.REACT_APP_API_URL + '/tsst-userInfo/getUserInfo.exclude', {
    headers: HeadersUtil.getHeadersAuth(),
  });
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {});
    builder.addCase(getUserInfo.fulfilled, (state, action: any) => {
      if (action.payload.data.status) {
        state.userInfo = { ...state.userInfo, ...action.payload.data.responseData };
        state.isLogin = true;
      }
    });
    builder.addCase(getUserInfo.rejected, (state, action: any) => {
      state.userInfo = {};
      state.isLogin = false;
    });
  },
});

export default userSlice.reducer;
export const { updateUserInfo } = userSlice.actions;
