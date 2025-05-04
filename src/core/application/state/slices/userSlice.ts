import { User } from '@/core/domain/entities/user.entity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    usersList: User[];
    user?: User;
    deleteUserModal: boolean;
    selectedUser?: User;
}

const initialState: UserState = {
    usersList: [],
    user: undefined,
    deleteUserModal: false,
    selectedUser: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsersList: (state, action: PayloadAction<User[]>) => {
      state.usersList = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAddToUsersList: (state, action: PayloadAction<User>) => {
      state.usersList.push(action.payload);
    },
    setDeleteUserModal: (state, action: PayloadAction<boolean>) => {
      state.deleteUserModal = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | undefined>) => {
      state.selectedUser = action.payload;
    },
    setRemoveFromUsersList: (state, action: PayloadAction<number>) => {
      state.usersList = state.usersList.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsersList, setUser, setAddToUsersList, setDeleteUserModal, setSelectedUser, setRemoveFromUsersList } = userSlice.actions

export default userSlice.reducer;
