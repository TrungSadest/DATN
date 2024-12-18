import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from '../reducer/spinnerSlice';
import userReducer from '../reducer/userSlice';

const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
