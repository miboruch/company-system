import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientModel } from 'types';

interface InitialStateInterface {
  selectedClient: ClientModel | null;
  isClientInfoOpen: boolean;
  isEditClientCoordsOpen: boolean;
  isAddNewClientOpen: boolean;
}

const initialState: InitialStateInterface = {
  selectedClient: null,
  isClientInfoOpen: false,
  isAddNewClientOpen: false,
  isEditClientCoordsOpen: false
};

const clientToggleSlice = createSlice({
  name: 'clientToggle',
  initialState,
  reducers: {
    setSelectedClient: (state, { payload }: PayloadAction<ClientModel | null>) => {
      state.selectedClient = payload;
    },
    setClientInfoOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isClientInfoOpen = payload;
    },
    setAddNewClientOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddNewClientOpen = payload;
    },
    setEditClientCoordsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditClientCoordsOpen = payload;
    },
    resetClientToggle: () => initialState
  }
});

export const {
  setSelectedClient,
  setClientInfoOpen,
  setAddNewClientOpen,
  setEditClientCoordsOpen,
  resetClientToggle
} = clientToggleSlice.actions;

export default clientToggleSlice.reducer;
