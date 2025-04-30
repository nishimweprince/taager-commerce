import { useCreateUserMutation } from '@/adapters/api/userApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAppDispatch } from '../state/hooks';
import { setUser } from '../state/slices/userSlice';
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter';
import { STORAGE_KEYS } from '@/infrastructure/storage/storageKeys';

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
