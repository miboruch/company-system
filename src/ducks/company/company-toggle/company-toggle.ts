import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateInterface {
  isAddCompanyOpen: boolean;
  isEditCompanyCoordsOpen: boolean;
}

const initialState: InitialStateInterface = {
  isAddCompanyOpen: false,
  isEditCompanyCoordsOpen: false
};

const companyToggleSlice = createSlice({
  name: 'companyToggle',
  initialState,
  reducers: {
    resetCompanyToggle: () => initialState,
    setAddCompanyOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddCompanyOpen = payload;
    },
    setEditCompanyCoordsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditCompanyCoordsOpen = payload;
    }
  }
});

export const { resetCompanyToggle, setAddCompanyOpen, setEditCompanyCoordsOpen } = companyToggleSlice.actions;

export default companyToggleSlice.reducer;
