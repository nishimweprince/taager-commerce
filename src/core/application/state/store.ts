import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import { productApiQuerySlice } from '../../../adapters/api/products/productApiQuerySlice';
import { authApiQuerySlice } from '../../../adapters/api/authApiSlice';
import { userApiSlice } from '../../../adapters/api/users/userApiSlice';
import userSlice from './slices/userSlice';
import sidebarSlice from './slices/sidebarSlice';
import { productApiSlice } from '../../../adapters/api/products/productApiSlice';
import { cartApiQuerySlice } from '../../../adapters/api/cart/cartApiQuerySlice';
import { userApiQuerySlice } from '../../../adapters/api/users/userApiQuerySlice';
import { cartApiSlice } from '../../../adapters/api/cart/cartApiSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [productApiQuerySlice.reducerPath]: productApiQuerySlice.reducer,
    [authApiQuerySlice.reducerPath]: authApiQuerySlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [cartApiQuerySlice.reducerPath]: cartApiQuerySlice.reducer,
    [userApiQuerySlice.reducerPath]: userApiQuerySlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    sidebar: sidebarSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApiQuerySlice.middleware,
      authApiQuerySlice.middleware,
      userApiSlice.middleware,
      productApiSlice.middleware,
      cartApiQuerySlice.middleware,
      userApiQuerySlice.middleware,
      cartApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
