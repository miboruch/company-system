import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientInterface } from '../../../types/modelsTypes';
import { getCompanyClients } from './client-data-creators';

interface InitialStateInterface {
  allCompanyClients: ClientInterface[];
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyClients.pending.type, (state) => {
      state.areClientsLoading = true;
      state.clientError = undefined;
    });
    builder.addCase(getCompanyClients.fulfilled.type, (state, { payload }: PayloadAction<ClientInterface[]>) => {
      state.areClientsLoading = false;
      state.allCompanyClients = payload;
    });
    builder.addCase(getCompanyClients.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areClientsLoading = false;
      state.clientError = payload;
    });
  }
});

export default clientDataSlice.reducer;
