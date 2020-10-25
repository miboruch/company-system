import axios from 'axios';
import { CompanyInterface } from '../types/modelsTypes';
import {
  SET_ADD_COMPANY_OPEN,
  SET_ALL_USER_COMPANIES,
  SET_COMPANIES_ERROR,
  SET_CURRENT_COMPANY,
  SET_COMPANY_LOADING,
  SetAddCompanyOpen,
  SetAllUserCompanies,
  SetCompaniesError,
  SetCurrentCompany,
  SetCompanyLoading
} from '../types/actionTypes/companyActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';

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

export const getUserAdminCompanies = (token: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(setCompanyLoading(true));

    const { data } = await axios.get(`${API_URL}/user/get-user-companies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(setAllUserCompanies(data));
  } catch (error) {
    dispatch(setCompaniesError(error));
  }
};

export const getUserEmployeeCompanies = (token: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(setCompanyLoading(true));

    const { data } = await axios.get(`${API_URL}/employee/get-employee-companies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(setAllUserCompanies(data));
  } catch (error) {
    dispatch(setCompaniesError(error));
  }
};

export const setCompany = (currentCompany: CompanyInterface | null, successCallback: () => void) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setCurrentCompany(currentCompany));
  successCallback();
};
