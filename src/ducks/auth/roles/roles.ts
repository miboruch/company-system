import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

interface InitialStateInterface {
  role: UserRole;
}

const initialState: InitialStateInterface = {
  role: UserRole.User
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRole: (state, { payload }: PayloadAction<UserRole>) => {
      state.role = payload;
    }
  }
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
