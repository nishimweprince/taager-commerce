import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from '../endpoints';
import { Product } from '@/core/domain/entities/product.entity';

export const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Products', 'Categories', 'Cart'],
  endpoints: (builder) => ({
    /**
     * PRODUCT ENDPOINTS
     */

    // DELETE PRODUCT
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: API_ENDPOINTS.PRODUCT_BY_ID(id),
        method: 'DELETE',
      }),
    }),

    // CREATE PRODUCT
    createProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: API_ENDPOINTS.PRODUCTS,
        method: 'POST',
        body: product,
      }),
    }), 

    // UPDATE PRODUCT
    updateProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: API_ENDPOINTS.PRODUCT_BY_ID(product.id),
        method: 'PUT',
        body: product,
      }),
    }),
  }),
});

export const { useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation } = productApiSlice;
