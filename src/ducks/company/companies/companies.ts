import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyModel } from 'types';
import { getUserCompanies } from './companies-creators';

interface InitialStateInterface {
  areUserCompaniesLoading: boolean;
  userCompanies: CompanyModel[];
  userCompaniesError: string | undefined;
}

const initialState: InitialStateInterface = {
  areUserCompaniesLoading: false,
  userCompanies: [],
  userCompaniesError: undefined
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    resetCompanies: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCompanies.pending.type, (state) => {
      state.areUserCompaniesLoading = true;
      state.userCompaniesError = undefined;
    });
    builder.addCase(getUserCompanies.fulfilled.type, (state, { payload }: PayloadAction<CompanyModel[]>) => {
      state.areUserCompaniesLoading = false;
      state.userCompanies = payload;
    });
    builder.addCase(getUserCompanies.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areUserCompaniesLoading = false;
      state.userCompaniesError = payload;
    });
  }
});

export const { resetCompanies } = companiesSlice.actions;

export default companiesSlice.reducer;
