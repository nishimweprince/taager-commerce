import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from '../endpoints';
import { ApiUser } from '@/adapters/mappers/userMapper';

export const userApiQuerySlice = createApi({
  reducerPath: 'userApiQuery',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

    // FETCH ALL USERS
    fetchAllUsers: builder.query<ApiUser[], void>({
      query: () => ({
        url: API_ENDPOINTS.USERS,
        method: 'GET',
      }),
    }),

    // GET USER BY ID
    getUserById: builder.query<ApiUser, number>({
      query: (id: number) => ({
        url: `${API_ENDPOINTS.USERS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLazyFetchAllUsersQuery, useLazyGetUserByIdQuery } = userApiQuerySlice;
