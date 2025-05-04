import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from '../endpoints';
import { ApiCart } from '@/adapters/mappers/cartMapper';

export const cartApiSlice = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({

    // DELETE CART
    deleteCart: builder.mutation<ApiCart, number>({
      query: (id) => ({
        url: `${API_ENDPOINTS.CART}/${id}`,
        method: 'DELETE',
      }),
    }),

    // UPDATE CART
    updateCart: builder.mutation<ApiCart, { id: number; data: Partial<ApiCart> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.CART}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useDeleteCartMutation, useUpdateCartMutation } = cartApiSlice;
