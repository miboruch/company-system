import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { validateRegistrationToken, registerFromLink } from './link-registration-creators';

interface InitialStateInterface {
  isValidateLoading: boolean;
  isValidateError: string | undefined;
  isRegisterLoading: boolean,
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
  reducers: {},
  extraReducers: {
    [validateRegistrationToken.pending.type]: (state) => {
      state.isValidateLoading = true;
    },
    [validateRegistrationToken.fulfilled.type]: (state) => {
      state.isValidateLoading = false;
    },
    [validateRegistrationToken.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.isValidateLoading = false;
      state.isValidateError = payload;
    },
    [registerFromLink.pending.type]: (state) => {
      state.isRegisterLoading = true;
    },
    [registerFromLink.fulfilled.type]: (state) => {
      state.isRegisterLoading = false;
    },
    [registerFromLink.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.isRegisterLoading = false;
      state.isRegisterError = payload;
    }
  }
});

export default registrationMailSlice.reducer;
