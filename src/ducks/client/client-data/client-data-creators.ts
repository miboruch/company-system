import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientInterface } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
import { companyApi } from '../../../api';

export const getCompanyClients = createAsyncThunk<ClientInterface[], void, baseStoreType>('client/getCompanyClients', async (_arg, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      const { data } = await companyApi.get(`/client/get-company-clients`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data as ClientInterface[];
    } else {
      return [] as ClientInterface[];
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
