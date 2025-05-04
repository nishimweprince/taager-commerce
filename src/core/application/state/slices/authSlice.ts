import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setLogout: () => {
      localStorageAdapter.removeItem('auth_token');
      window.location.href = '/auth/login';
    },
  },
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
