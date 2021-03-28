import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { CompanyModel } from 'types';

interface InitialStateInterface {
  currentCompany: CompanyModel | null;
  userCompanies: CompanyModel[];
  userCompaniesError: string | undefined;
}

const initialState: InitialStateInterface = {
  currentCompany: null,
  userCompanies: [],
  userCompaniesError: undefined
};

const currentCompanySlice = createSlice({
  name: 'currentCompany',
  initialState,
  reducers: {
    resetCurrentCompany: () => initialState,
    setCompany: (state, { payload }: PayloadAction<CompanyModel | null>) => {
      state.currentCompany = payload;
    }
  }
  // extraReducers: {
  //   [getUserCompanies.pending.type]: (state) => {
  //     state.areUserCompaniesLoading = true;
  //     state.userCompaniesError = undefined;
  //   },
  //   [getUserCompanies.fulfilled.type]: (state, { payload }: PayloadAction<CompanyInterface[]>) => {
  //     state.areUserCompaniesLoading = false;
  //     state.userCompanies = payload;
  //   },
  //   [getUserCompanies.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
  //     state.areUserCompaniesLoading = false;
  //     state.userCompaniesError = payload;
  //   }
  // }
});

export const { setCompany, resetCurrentCompany } = currentCompanySlice.actions;

export default currentCompanySlice.reducer;
