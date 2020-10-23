import axios from 'axios';
import { CompanyInterface } from '../types/modelsTypes';
import {
  SET_LOADING,
  SET_COMPANIES_ERROR,
  SET_CURRENT_COMPANY,
  CompanyActionTypes,
  SetLoading,
  SET_ALL_USER_COMPANIES,
  SetAllUserCompanies,
  SetCompaniesError,
  SetCurrentCompany
} from '../types/companyActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/appActionTypes';
import { API_URL } from '../utils/config';

const setLoading = (isLoading: boolean): SetLoading => {
  return {
    type: SET_LOADING,
    payload: isLoading
  };
};

export const setAllUserCompanies = (userCompanies: CompanyInterface[]): SetAllUserCompanies => {
  return {
    type: SET_ALL_USER_COMPANIES,
    payload: userCompanies
  };
};

export const setCurrentCompany = (currentCompany: CompanyInterface | null): SetCurrentCompany => {
  return {
    type: SET_CURRENT_COMPANY,
    payload: currentCompany
  };
};

export const setCompaniesError = (error: string | null): SetCompaniesError => {
  return {
    type: SET_COMPANIES_ERROR,
    payload: error
  };
};

export const getUserAdminCompanies = (token: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(setLoading(true));

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
    dispatch(setLoading(true));

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
