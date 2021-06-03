import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserModel } from 'types';

interface InitialStateInterface {
  user: UserModel | null;
}

const initialState: InitialStateInterface = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserModel | null>) => {
      state.user = payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
