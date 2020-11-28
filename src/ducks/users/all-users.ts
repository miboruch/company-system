import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllAppUsers } from './all-users-creators';
import { UserDataInterface } from '../../types/modelsTypes';

interface InitialStateInterface {
  areAllUsersLoading: boolean;
  allUsers: any[];
  allUsersError: string | undefined;
}

const initialState: InitialStateInterface = {
  areAllUsersLoading: false,
  allUsers: [],
  allUsersError: undefined
};

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    resetAllUsersState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAppUsers.pending.type, (state) => {
      state.areAllUsersLoading = true;
      state.allUsersError = undefined;
    });
    builder.addCase(getAllAppUsers.fulfilled.type, (state, { payload }: PayloadAction<UserDataInterface[]>) => {
      state.areAllUsersLoading = false;
      state.allUsers = payload;
    });
    builder.addCase(getAllAppUsers.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areAllUsersLoading = false;
      state.allUsersError = payload;
    });
  }
});

export const { resetAllUsersState } = allUsersSlice.actions;

export default allUsersSlice.reducer;
