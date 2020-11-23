import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientInterface } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
import { adminApi } from '../../../api';

export const getCompanyClients = createAsyncThunk<ClientInterface[], void, baseStoreType>('client/getCompanyClients', async (_arg, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany?._id && token) {
      const { data } = await adminApi.get(`/client/get-company-clients`);

      return data as ClientInterface[];
    } else {
      return [] as ClientInterface[];
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
