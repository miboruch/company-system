import { ClientInterface } from '../modelsTypes';

export const SET_CLIENTS_LOADING = 'SET_CLIENTS_LOADING';
export const SET_COMPANY_CLIENTS = 'SET_COMPANY_CLIENTS';
export const SET_SELECTED_CLIENT = 'SET_SELECTED_CLIENT';
export const SET_CLIENT_ERROR = 'SET_CLIENT_ERROR';
export const SET_CLIENT_INFO_OPEN = 'SET_CLIENT_INFO_OPEN';
export const SET_ADD_NEW_CLIENT_OPEN = 'SET_ADD_NEW_CLIENT_OPEN';

export interface SetClientsLoading {
  type: typeof SET_CLIENTS_LOADING;
  payload: boolean;
}

export interface SetCompanyClients {
  type: typeof SET_COMPANY_CLIENTS;
  payload: ClientInterface[];
}

export interface SetSelectedClient {
  type: typeof SET_SELECTED_CLIENT;
  payload: ClientInterface | null;
}

export interface SetClientError {
  type: typeof SET_CLIENT_ERROR;
  payload: string | null;
}

export interface SetClientInfoOpen {
  type: typeof SET_CLIENT_INFO_OPEN;
  payload: boolean;
}

export interface SetAddNewClientOpen {
  type: typeof SET_ADD_NEW_CLIENT_OPEN;
  payload: boolean;
}

export type ClientActionTypes = SetClientsLoading | SetCompanyClients | SetSelectedClient | SetClientError | SetClientInfoOpen | SetAddNewClientOpen;
