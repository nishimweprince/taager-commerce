import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from './endpoints';
import { ApiProduct } from './mappers/productMapper';

export const apiQuerySlice = createApi({
  reducerPath: 'apiQuery',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Products', 'Categories', 'Cart'],
  endpoints: (builder) => ({
    /**
     * PRODUCT ENDPOINTS
     */

    // GET ALL PRODUCTS
    fetchAllProducts: builder.query<ApiProduct[], void>({
      query: () => API_ENDPOINTS.PRODUCTS,
      providesTags: ['Products'],
    }),

    // GET PRODUCT BY ID
    getProductById: builder.query<ApiProduct, number>({
      query: (id) => API_ENDPOINTS.PRODUCT_BY_ID(id),
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),

    // GET PRODUCTS BY CATEGORY
    fetchProductsByCategory: builder.query<ApiProduct[], string>({
      query: (category) => API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category),
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useLazyFetchAllProductsQuery,
  useLazyGetProductByIdQuery,
  useLazyFetchProductsByCategoryQuery,
} = apiQuerySlice;
