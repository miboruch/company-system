import { ClientInterface } from '../types/modelsTypes';
import {
  ClientActionTypes,
  RESET_CLIENTS,
  SET_ADD_NEW_CLIENT_OPEN,
  SET_CLIENT_ERROR,
  SET_CLIENT_INFO_OPEN,
  SET_CLIENTS_LOADING,
  SET_COMPANY_CLIENTS,
  SET_SELECTED_CLIENT
} from '../types/actionTypes/clientActionTypes';

interface DefaultState {
  allCompanyClients: ClientInterface[];
  selectedClient: ClientInterface | null;
  isLoading: boolean;
  error: string | null;
  isClientInfoOpen: boolean;
  isAddNewClientOpen: boolean;
}

const initialState: DefaultState = {
  allCompanyClients: [],
  selectedClient: null,
  isLoading: false,
  error: null,
  isClientInfoOpen: false,
  isAddNewClientOpen: false
};

export const clientReducer = (state = initialState, action: ClientActionTypes): DefaultState => {
  switch (action.type) {
    case SET_CLIENTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
        // selectedClient: null
      };
    case SET_COMPANY_CLIENTS:
      return {
        ...state,
        isLoading: false,
        allCompanyClients: action.payload
      };
    case SET_SELECTED_CLIENT:
      return {
        ...state,
        selectedClient: action.payload
      };
    case SET_CLIENT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_CLIENT_INFO_OPEN:
      return {
        ...state,
        isClientInfoOpen: action.payload
      };
    case SET_ADD_NEW_CLIENT_OPEN:
      return {
        ...state,
        isAddNewClientOpen: action.payload
      };
    case RESET_CLIENTS:
      return initialState;
    default:
      return state;
  }
};
