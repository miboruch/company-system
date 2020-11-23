import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { register } from './register-creators';

interface InitialStateInterface {
  isRegisterLoading: boolean;
  registerError: string | undefined;
}

const initialState: InitialStateInterface = {
  isRegisterLoading: false,
  registerError: undefined
};

const registerSlice: Slice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending.type, (state) => {
      state.isRegisterLoading = true;
      state.registerError = undefined;
    });
    builder.addCase(register.fulfilled.type, (state) => {
      state.isRegisterLoading = false;
    });
    builder.addCase(register.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isRegisterLoading = false;
      state.registerError = payload;
    });
  }
});

export default registerSlice.reducer;
