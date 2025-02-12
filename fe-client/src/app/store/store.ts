import { configureStore } from '@reduxjs/toolkit';

import layoutReducer from '../reducers/layoutSlice';
import menuReducer from '../reducers/sidebarSlice';
import userInfoReducer from '../reducers/userSlice';
import spinnerReducer from '../reducers/spinnerSlice';
import triggerReducer from '../reducers/triggerSlice';
import multiLangReducer from '../reducers/multiLangSilce';

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    menus: menuReducer,
    userInfo: userInfoReducer,
    spinner: spinnerReducer,
    trigger: triggerReducer,
    multiLang: multiLangReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
