import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from '../endpoints';
import { ApiCart } from '@/adapters/mappers/cartMapper';

export const cartApiQuerySlice = createApi({
  reducerPath: 'cartApiQuery',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    /**
     * CART ENDPOINTS
     */

    // FETCH ALL CARTS
    fetchAllCarts: builder.query<ApiCart[], void>({
      query: () => API_ENDPOINTS.CART,
      providesTags: ['Cart'],
    }),

    // GET CART BY ID
    getCartById: builder.query<ApiCart, number>({
      query: (id) => `${API_ENDPOINTS.CART}/${id}`,
      providesTags: ['Cart'],
    }),
  }),
});

export const { useLazyFetchAllCartsQuery, useLazyGetCartByIdQuery } = cartApiQuerySlice;

