import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientModel } from 'types';
import { getCompanyClients } from './client-data-creators';

interface InitialStateInterface {
  allCompanyClients: ClientModel[];
  areClientsLoading: boolean;
  clientError: string | undefined;
}

const initialState: InitialStateInterface = {
  allCompanyClients: [],
  areClientsLoading: false,
  clientError: undefined
};

const clientDataSlice = createSlice({
  name: 'clientData',
  initialState,
  reducers: {
    resetClientData: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyClients.pending.type, (state) => {
      state.areClientsLoading = true;
      state.clientError = undefined;
    });
    builder.addCase(getCompanyClients.fulfilled.type, (state, { payload }: PayloadAction<ClientModel[]>) => {
      state.areClientsLoading = false;
      state.allCompanyClients = payload;
    });
    builder.addCase(getCompanyClients.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areClientsLoading = false;
      state.clientError = payload;
    });
  }
});

export const { resetClientData } = clientDataSlice.actions;

export default clientDataSlice.reducer;
