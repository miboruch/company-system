import { createAsyncThunk } from '@reduxjs/toolkit';

import { ClientModel } from 'types';
import { baseStoreType } from 'store/store';
import { companyApi } from 'api';

export const getCompanyClients = createAsyncThunk<ClientModel[], void, baseStoreType>(
  'client/getCompanyClients',
  async (_arg, { rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;

    try {
      if (token) {
        const { data } = await companyApi.get(`/client/company`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data as ClientModel[];
      } else {
        return [] as ClientModel[];
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
