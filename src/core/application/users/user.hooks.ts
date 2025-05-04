import { useCreateUserMutation, useDeleteUserMutation } from '@/adapters/api/users/userApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '../state/hooks';
import { setUser, setUsersList } from '../state/slices/userSlice';
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter';
import { STORAGE_KEYS } from '@/infrastructure/storage/storageKeys';
import { useLazyFetchAllUsersQuery, useLazyGetUserByIdQuery } from '@/adapters/api/users/userApiQuerySlice';
import { User } from '@/core/domain/entities/user.entity';
import { toUser } from '@/adapters/mappers/userMapper';

// CREATE USER
export const useCreateUser = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  const [
    createUser,
    {
      isLoading: createUserIsLoading,
      error: createUserError,
      data: createUserData,
      isError: createUserIsError,
      isSuccess: createUserIsSuccess,
      reset: createUserReset,
    },
  ] = useCreateUserMutation();

  useEffect(() => {

    // HANDLE ERROR
    if (createUserIsError) {
      const errorData = (createUserError as FetchBaseQueryError)?.data;
      toast.error(
        typeof errorData === 'string' ? errorData : 'An error occurred'
      );

      // HANDLE SUCCESS
    } else if (createUserIsSuccess) {
      toast.success('User created successfully');
      dispatch(setUser(toUser(createUserData)));
      localStorageAdapter.setItem(STORAGE_KEYS.USER, createUserData);
    }
  }, [
    createUserIsError,
    createUserError,
    createUserIsSuccess,
    dispatch,
    createUserData,
  ]);

  return { createUser, createUserIsLoading, createUserError, createUserData, createUserIsSuccess, createUserReset };
};

// GET USER BY ID
export const useGetUserById = () => {

  /**
   * STATE VARIABLES
   */

  const [user, setUser] = useState<User | undefined>(undefined);

  /**
   * FETCH USER BY ID
   */

  const [
    getUserById,
    {
      isFetching: getUserByIdIsFetching,
      error: getUserByIdError,
      data: getUserByIdData,
      isError: getUserByIdIsError,
      isSuccess: getUserByIdIsSuccess,
    },
  ] = useLazyGetUserByIdQuery();

  useEffect(() => {
    if (getUserByIdIsSuccess) {
      setUser(toUser(getUserByIdData));
    }
  }, [getUserByIdIsSuccess, getUserByIdData, setUser]);

  return {
    getUserById,
    getUserByIdIsFetching,
    getUserByIdError,
    getUserByIdData,
    getUserByIdIsError,
    getUserByIdIsSuccess,
    user,
    setUser
  };
};

// FETCH ALL USERS
export const useFetchAllUsers = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  const [
    fetchAllUsers,
    {
      isFetching: usersIsFetching,
      error: usersError,
      data: usersData,
      isError: usersIsError,
      isSuccess: usersIsSuccess,
    },
  ] = useLazyFetchAllUsersQuery();

  useEffect(() => {
    if (usersIsSuccess) {
      dispatch(setUsersList(usersData.map(toUser)));
    }
  }, [usersIsSuccess, usersData, dispatch]);

  return {
    fetchAllUsers,
    usersIsFetching,
    usersError,
    usersData,
    usersIsError,
    usersIsSuccess,
  };
}

// DELETE USER
export const useDeleteUser = () => {
  /**
   * STATE VARIABLES
   */

  const [
    deleteUser,
    {
      isLoading: deleteUserIsLoading,
      error: deleteUserError,
      isError: deleteUserIsError,
      isSuccess: deleteUserIsSuccess,
      reset: deleteUserReset,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (deleteUserIsError) {
      toast.error('An error occurred');
    }
  }, [deleteUserIsSuccess, deleteUserIsError]);

  return { deleteUser, deleteUserIsLoading, deleteUserError, deleteUserIsSuccess, deleteUserReset };
}
