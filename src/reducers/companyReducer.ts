import { CompanyActionTypes, SET_ALL_USER_COMPANIES, SET_COMPANIES_ERROR, SET_CURRENT_COMPANY, SET_LOADING } from '../types/companyActionTypes';
import { CompanyInterface } from '../types/modelsTypes';

interface DefaultState {
  isLoading: boolean;
  userCompanies: CompanyInterface[];
  currentCompany: CompanyInterface | null;
  error: string | null;
}

const initialState: DefaultState = {
  isLoading: false,
  userCompanies: [],
  currentCompany: null,
  error: null
};

export const companyReducer = (state = initialState, action: CompanyActionTypes): DefaultState => {
  switch (action.type) {
    case SET_LOADING:
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
    default:
      return state;
  }
};
