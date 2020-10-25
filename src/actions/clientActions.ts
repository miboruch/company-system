import axios from 'axios';
import { ClientInterface } from '../types/modelsTypes';
import {
  SET_ADD_NEW_CLIENT_OPEN,
  SET_CLIENT_ERROR,
  SET_CLIENT_INFO_OPEN,
  SET_CLIENTS_LOADING,
  SET_COMPANY_CLIENTS,
  SET_SELECTED_CLIENT,
  SetAddNewClientOpen,
  SetClientError,
  SetClientInfoOpen,
  SetClientsLoading,
  SetCompanyClients,
  SetSelectedClient
} from '../types/actionTypes/clientActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';

const setClientsLoading = (isLoading: boolean): SetClientsLoading => {
  return {
    type: SET_CLIENTS_LOADING,
    payload: isLoading
  };
};

const setCompanyClients = (clients: ClientInterface[]): SetCompanyClients => {
  return {
    type: SET_COMPANY_CLIENTS,
    payload: clients
  };
};

const setSelectedClient = (client: ClientInterface | null): SetSelectedClient => {
  return {
    type: SET_SELECTED_CLIENT,
    payload: client
  };
};

const setClientError = (error: string | null): SetClientError => {
  return {
    type: SET_CLIENT_ERROR,
    payload: error
  };
};

export const setClientInfoOpen = (isOpen: boolean): SetClientInfoOpen => {
  return {
    type: SET_CLIENT_INFO_OPEN,
    payload: isOpen
  };
};

const setAddNewClientOpen = (isOpen: boolean): SetAddNewClientOpen => {
  return {
    type: SET_ADD_NEW_CLIENT_OPEN,
    payload: isOpen
  };
};

export const getCompanyClients = (token: string, companyId: string) => async (dispatch: Dispatch<AppTypes>) => {
  dispatch(setClientsLoading(true));

  try {
    const { data } = await axios.get(`${API_URL}/client/get-company-clients?company_id=${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(setCompanyClients(data));
  } catch (error) {
    console.log(error);
    dispatch(setClientError(error));
  }
};

export const selectClient = (client: ClientInterface | null) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setSelectedClient(client));
  dispatch(setClientInfoOpen(true));
};
