import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import { apiQuerySlice } from '../../../adapters/api/apiQuerySlice';
export const store = configureStore({
  reducer: {
    [apiQuerySlice.reducerPath]: apiQuerySlice.reducer,
    product: productSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiQuerySlice.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
