import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from '../endpoints';
import { ApiUser } from '@/adapters/mappers/userMapper';

export const userApiQuerySlice = createApi({
  reducerPath: 'userApiQuery',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserById: builder.query<ApiUser, number>({
      query: (id: number) => ({
        url: `${API_ENDPOINTS.USERS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLazyGetUserByIdQuery } = userApiQuerySlice;
