import {
  CompanyActionTypes,
  RESET_COMPANY,
  SET_ADD_COMPANY_OPEN,
  SET_ALL_USER_COMPANIES,
  SET_COMPANIES_ERROR,
  SET_COMPANY_LOADING,
  SET_CURRENT_COMPANY
} from '../types/actionTypes/companyActionTypes';
import { CompanyInterface } from '../types/modelsTypes';

interface DefaultState {
  isLoading: boolean;
  userCompanies: CompanyInterface[];
  currentCompany: CompanyInterface | null;
  isAddCompanyOpen: boolean;
  error: string | null;
}

const initialState: DefaultState = {
  isLoading: false,
  userCompanies: [],
  currentCompany: null,
  isAddCompanyOpen: false,
  error: null
};

export const companyReducer = (state = initialState, action: CompanyActionTypes): DefaultState => {
  switch (action.type) {
    case SET_COMPANY_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null
      };
    case SET_ALL_USER_COMPANIES:
      return {
        ...state,
        userCompanies: action.payload,
        isLoading: false,
        error: null
      };
    case SET_CURRENT_COMPANY:
      return {
        ...state,
        currentCompany: action.payload
      };
    case SET_COMPANIES_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_ADD_COMPANY_OPEN:
      return {
        ...state,
        isAddCompanyOpen: action.payload
      };
    case RESET_COMPANY:
      return initialState;
    default:
      return state;
  }
};
