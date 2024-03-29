import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { CompanyOwnersModel } from 'types';
import { getCompanyOwners } from './company-owners-creators';

interface InitialStateInterface {
  areOwnersLoading: boolean;
  companyOwners: CompanyOwnersModel[];
}

const initialState: InitialStateInterface = {
  areOwnersLoading: false,
  companyOwners: []
};

const companyOwnersSlice = createSlice({
  name: 'companyOwners',
  initialState,
  reducers: {
    resetCompanyOwners: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyOwners.pending.type, (state) => {
      state.areOwnersLoading = true;
    });
    builder.addCase(getCompanyOwners.fulfilled.type, (state, { payload }: PayloadAction<CompanyOwnersModel[]>) => {
      state.areOwnersLoading = false;
      state.companyOwners = payload;
    });
    builder.addCase(getCompanyOwners.rejected.type, (state) => {
      state.areOwnersLoading = false;
    });
  }
});

export const { resetCompanyOwners } = companyOwnersSlice.actions;

export default companyOwnersSlice.reducer;
