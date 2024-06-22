import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import cartSlice from './features/cart/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      cart: cartSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
