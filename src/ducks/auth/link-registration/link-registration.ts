import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { validateRegistrationToken, registerFromLink } from './link-registration-creators';

interface InitialStateInterface {
  isValidateLoading: boolean;
  isValidateError: string | undefined;
  isRegisterLoading: boolean;
  isRegisterError: string | undefined;
}

const initialState: InitialStateInterface = {
  isValidateLoading: false,
  isValidateError: undefined,
  isRegisterLoading: false,
  isRegisterError: undefined
};

const registrationMailSlice = createSlice({
  name: 'registrationMail',
  initialState,
  reducers: {
    resetMailRegistrationState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(validateRegistrationToken.pending.type, (state) => {
      state.isValidateLoading = true;
    });
    builder.addCase(validateRegistrationToken.fulfilled.type, (state) => {
      state.isValidateLoading = false;
    });
    builder.addCase(validateRegistrationToken.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isValidateLoading = false;
      state.isValidateError = payload;
    });
    builder.addCase(registerFromLink.pending.type, (state) => {
      state.isRegisterLoading = true;
    });
    builder.addCase(registerFromLink.fulfilled.type, (state) => {
      state.isRegisterLoading = false;
    });
    builder.addCase(registerFromLink.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isRegisterLoading = false;
      state.isRegisterError = payload;
    });
  }
});

export default registrationMailSlice.reducer;
