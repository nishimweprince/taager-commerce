import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from './endpoints';
import { ApiAuth } from './mappers/authMapper';

export const authApiQuerySlice = createApi({
  reducerPath: 'authApiQuery',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<ApiAuth, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: `${API_ENDPOINTS.AUTH}/login`,
        method: 'POST',
        body: { username, password },
      }),
    }),
    
    register: builder.mutation<ApiAuth, { username: string; password: string; email: string; fullName: string }>({
      query: ({ username, password, email, fullName }) => ({
        url: `${API_ENDPOINTS.AUTH}/register`,
        method: 'POST',
        body: { username, password, email, fullName },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiQuerySlice;
