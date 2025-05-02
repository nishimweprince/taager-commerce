import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import { productApiQuerySlice } from '../../../adapters/api/products/productApiQuerySlice';
import { authApiQuerySlice } from '../../../adapters/api/authApiSlice';
import { userApiQuerySlice } from '../../../adapters/api/userApiSlice';
import userSlice from './slices/userSlice';
import sidebarSlice from './slices/sidebarSlice';
import { productApiSlice } from '../../../adapters/api/products/productApiSlice';

export const store = configureStore({
  reducer: {
    [productApiQuerySlice.reducerPath]: productApiQuerySlice.reducer,
    [authApiQuerySlice.reducerPath]: authApiQuerySlice.reducer,
    [userApiQuerySlice.reducerPath]: userApiQuerySlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApiQuerySlice.middleware,
      authApiQuerySlice.middleware,
      userApiQuerySlice.middleware,
      productApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
