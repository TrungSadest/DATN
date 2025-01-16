import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HeadersUtil } from '../utils/headersUtil';
import Cookies from 'universal-cookie';
import { AuthConstant } from '../constants/authConstant';

const cookie = new Cookies();

const initialState: any = {
  userInfo: {},
  isLogin: cookie.get(AuthConstant.ACCESS_TOKEN) !== undefined && cookie.get(AuthConstant.ACCESS_TOKEN) !== '',
};

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  return axios.get(process.env.REACT_APP_API_URL + '/auth/getUserInfo', {
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
    checkLoginStatus: (state) => {
      state.isLogin = cookie.get(AuthConstant.ACCESS_TOKEN) !== undefined && cookie.get(AuthConstant.ACCESS_TOKEN) !== '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => { });
    builder.addCase(getUserInfo.fulfilled, (state, action: any) => {
      if (action.payload.data.status) {
        state.userInfo = { ...state.userInfo, ...action.payload.data.responseData };
        state.isLogin = true; // Cập nhật isLogin khi có dữ liệu người dùng
      }
    });
    builder.addCase(getUserInfo.rejected, (state, action: any) => {
      state.userInfo = {};
      state.isLogin = false; // Cập nhật isLogin khi request thất bại
    });
  },
});

export default userSlice.reducer;
export const { updateUserInfo } = userSlice.actions;
