import { useLoginMutation, useRegisterMutation } from '@/adapters/api/authApiSlice';
import { ReactNode, useEffect } from 'react';
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { STORAGE_KEYS } from '@/infrastructure/storage/storageKeys';

export const useLogin = () => {

    /**
     * NAVIGATION
     */
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

  const [
    login,
    {
      isLoading: loginIsLoading,
      error: loginError,
      isSuccess: loginIsSuccess,
      isError: loginIsError,
      data: loginData,
      reset: loginReset,
    },
  ] = useLoginMutation();

  useEffect(() => {
    // HANDLE LOGIN SUCCESS
    if (loginIsSuccess) {
      localStorageAdapter.setItem(STORAGE_KEYS.AUTH_TOKEN, loginData?.token);

      // REDIRECT TO THE PREVIOUS PAGE
      navigate(searchParams.get('redirect') || '/');
    } else if (loginIsError) {
      toast('Login failed', {
        description: (loginError as FetchBaseQueryError)?.data as ReactNode,
      });
      loginReset();
    }
  }, [
    loginIsSuccess,
    loginData,
    loginIsError,
    loginError,
    loginReset,
    navigate,
    searchParams,
  ]);

  return {
    loginIsLoading,
    loginError,
    loginIsSuccess,
    loginIsError,
    login,
  };
};

export const useRegister = () => {
  /**
   * NAVIGATION
   */
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [
    register,
    {
      isLoading: registerIsLoading,
      error: registerError,
      isSuccess: registerIsSuccess,
      isError: registerIsError,
      data: registerData,
      reset: registerReset,
    },
  ] = useRegisterMutation();

  useEffect(() => {
    // HANDLE REGISTER SUCCESS
    if (registerIsSuccess) {
      localStorageAdapter.setItem(STORAGE_KEYS.AUTH_TOKEN, registerData?.token);
      
      // Show success message
      toast('Registration successful', {
        description: 'Your account has been created successfully',
      });

      // REDIRECT TO THE PREVIOUS PAGE OR HOME
      navigate(searchParams.get('redirect') || '/');
    } else if (registerIsError) {
      toast('Registration failed', {
        description: (registerError as FetchBaseQueryError)?.data as ReactNode,
      });
      registerReset();
    }
  }, [
    registerIsSuccess,
    registerData,
    registerIsError,
    registerError,
    registerReset,
    navigate,
    searchParams,
  ]);

  return {
    registerIsLoading,
    registerIsSuccess,
    registerIsError,
    register,
  };
};
