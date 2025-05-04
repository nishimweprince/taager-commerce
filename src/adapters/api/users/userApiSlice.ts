import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from '../endpoints';
import { User } from '@/core/domain/entities/user.entity';
import { ApiUser } from '@/adapters/mappers/userMapper';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createUser: builder.mutation<User, ApiUser>({
      query: (user: ApiUser) => ({
        url: API_ENDPOINTS.USERS,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useCreateUserMutation } = userApiSlice;
