import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, BASE_URL } from '../endpoints';
import { User } from '@/core/domain/entities/user.entity';
import { ApiUser } from '@/adapters/mappers/userMapper';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

    // CREATE USER
    createUser: builder.mutation<ApiUser, User>({
      query: (user: User) => ({
        url: API_ENDPOINTS.USERS,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    // DELETE USER
    deleteUser: builder.mutation<User, number>({
      query: (id: number) => ({
        url: `${API_ENDPOINTS.USERS}/${id}`,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useCreateUserMutation, useDeleteUserMutation } = userApiSlice;
