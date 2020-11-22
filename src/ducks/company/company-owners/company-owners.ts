import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { CompanyOwnersInterface } from '../../../types/modelsTypes';
import { getCompanyOwners } from './company-owners-creators';

interface InitialStateInterface {
  areOwnersLoading: boolean;
  companyOwners: CompanyOwnersInterface[];
}

const initialState: InitialStateInterface = {
  areOwnersLoading: false,
  companyOwners: []
};

const currentCompanyOwnersSlice: Slice = createSlice({
  name: 'currentCompanyOwners',
  initialState,
  reducers: {},
  extraReducers: {
    [getCompanyOwners.pending.type]: (state) => {
      state.areOwnersLoading = true;
    },
    [getCompanyOwners.fulfilled.type]: (state, { payload }: PayloadAction<CompanyOwnersInterface[]>) => {
      state.areOwnersLoading = false;
      state.companyOwners = payload;
    },
    [getCompanyOwners.rejected.type]: (state) => {
      state.areOwnersLoading = false;
    }
  }
});

export const { setCompany } = currentCompanyOwnersSlice.actions;

export default currentCompanyOwnersSlice.reducer;
