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
import { AppState } from '../reducers/rootReducer';
import { setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';

const setClientsLoading = (isLoading: boolean): SetClientsLoading => {
  return {
    type: SET_CLIENTS_LOADING,
    payload: isLoading
  };
};

export const setCompanyClients = (clients: ClientInterface[]): SetCompanyClients => {
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

export const setAddNewClientOpen = (isOpen: boolean): SetAddNewClientOpen => {
  return {
    type: SET_ADD_NEW_CLIENT_OPEN,
    payload: isOpen
  };
};

export const getCompanyClients = () => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  dispatch(setClientsLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany?._id && token) {
      const { data } = await axios.get(`${API_URL}/client/get-company-clients?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setCompanyClients(data));
    } else {
      dispatch(setClientError('Problem z uwierzytelnieniem'));
    }
  } catch (error) {
    console.log(error);
    dispatch(setClientError(error));
  }
};

export const selectClient = (client: ClientInterface | null) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setSelectedClient(client));
  dispatch(setClientInfoOpen(!!client));
};

export const addNewClient = (name: string, address: string, email: string, phoneNumber: string, city: string, country: string, lat: number, long: number) => async (
  dispatch: Dispatch<any>,
  getState: () => AppState
) => {
  dispatch(setClientsLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany?._id && token) {
      await axios.post(
        `${API_URL}/client/create-client?company_id=${currentCompany._id}`,
        {
          name,
          address,
          email,
          phoneNumber,
          city,
          country,
          lat,
          long
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getCompanyClients());
      dispatch(setAddNewClientOpen(false));
      dispatch(setNotificationMessage('Dodano nowego klienta'));
    } else {
      dispatch(setClientError('Problem z uwierzytelnieniem'));
      dispatch(setNotificationMessage('Problem z dodaniem klienta', NotificationTypes.Error));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage('Problem z dodaniem klienta', NotificationTypes.Error));
    dispatch(setClientError(error));
  }
};

export const deleteClient = (clientId: string) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany?._id && token) {
      await axios.delete(`${API_URL}/client/delete-client/${clientId}?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(getCompanyClients());
      dispatch(setSelectedClient(null));
      dispatch(setClientInfoOpen(false));
      dispatch(setNotificationMessage('Usunięto klienta'));
    } else {
      dispatch(setClientError('Problem z uwierzytelnieniem'));
      dispatch(setNotificationMessage('Problem z usunięciem klienta', NotificationTypes.Error));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage('Problem z usunięciem klienta', NotificationTypes.Error));
  }
};
