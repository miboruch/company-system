import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { CompanyInterface } from '../../../types/modelsTypes';
import { getUserCompanies } from './companies-creators';

interface InitialStateInterface {
  areUserCompaniesLoading: boolean;
  userCompanies: CompanyInterface[];
  userCompaniesError: string | undefined;
}

const initialState: InitialStateInterface = {
  areUserCompaniesLoading: false,
  userCompanies: [],
  userCompaniesError: undefined
};

const companiesSlice: Slice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserCompanies.pending.type]: (state) => {
      state.areUserCompaniesLoading = true;
      state.userCompaniesError = undefined;
    },
    [getUserCompanies.fulfilled.type]: (state, { payload }: PayloadAction<CompanyInterface[]>) => {
      state.areUserCompaniesLoading = false;
      state.userCompanies = payload;
    },
    [getUserCompanies.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.areUserCompaniesLoading = false;
      state.userCompaniesError = payload;
    }
  }
});

export default companiesSlice.reducer;
