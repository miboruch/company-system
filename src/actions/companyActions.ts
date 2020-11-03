import axios from 'axios';
import { CompanyInterface } from '../types/modelsTypes';
import {
  SET_ADD_COMPANY_OPEN,
  SET_ALL_USER_COMPANIES,
  SET_COMPANIES_ERROR,
  SET_COMPANY_LOADING,
  SET_CURRENT_COMPANY,
  SetAddCompanyOpen,
  SetAllUserCompanies,
  SetCompaniesError,
  SetCompanyLoading,
  SetCurrentCompany
} from '../types/actionTypes/companyActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';
import { AppState } from '../reducers/rootReducer';
import { setUserRole } from './authenticationActions';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';
import { resetAllSelected } from './toggleActions';

const setCompanyLoading = (isLoading: boolean): SetCompanyLoading => {
  return {
    type: SET_COMPANY_LOADING,
    payload: isLoading
  };
};

export const setAllUserCompanies = (userCompanies: CompanyInterface[]): SetAllUserCompanies => {
  return {
    type: SET_ALL_USER_COMPANIES,
    payload: userCompanies
  };
};

const setCurrentCompany = (currentCompany: CompanyInterface | null): SetCurrentCompany => {
  return {
    type: SET_CURRENT_COMPANY,
    payload: currentCompany
  };
};

const setCompaniesError = (error: string | null): SetCompaniesError => {
  return {
    type: SET_COMPANIES_ERROR,
    payload: error
  };
};

export const setAddCompanyOpen = (isOpen: boolean): SetAddCompanyOpen => {
  return {
    type: SET_ADD_COMPANY_OPEN,
    payload: isOpen
  };
};

export const getUserCompanies = () => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  dispatch(setCompanyLoading(true));

  const { token, role } = getState().authenticationReducer;

  try {
    if (token && role) {
      const { data } = await axios.get(role === UserRole.Admin ? `${API_URL}/user/get-user-companies` : `${API_URL}/employee/get-employee-companies`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setAllUserCompanies(data));
      dispatch(resetAllSelected());
    } else {
      dispatch(setCompaniesError('Problem z uwierzytelnieniem'));
    }
  } catch (error) {
    dispatch(setCompaniesError(error));
  }
};

export const setCompany = (currentCompany: CompanyInterface | null, successCallback: () => void) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setCurrentCompany(currentCompany));
  dispatch(setUserRole(UserRole.Admin));
  successCallback();
};
