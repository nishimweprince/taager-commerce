import { useCreateUserMutation } from '@/adapters/api/users/userApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '../state/hooks';
import { setUser } from '../state/slices/userSlice';
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter';
import { STORAGE_KEYS } from '@/infrastructure/storage/storageKeys';
import { useLazyGetUserByIdQuery } from '@/adapters/api/users/userApiQuerySlice';
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
      dispatch(setUser(createUserData));
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