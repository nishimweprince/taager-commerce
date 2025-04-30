import { User } from '@/core/domain/entities/user.entity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    usersList: User[];
    user?: User;
}

const initialState: UserState = {
    usersList: [],
    user: undefined
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
  },
});

export const { setUsersList, setUser, setAddToUsersList } = userSlice.actions

export default userSlice.reducer;
