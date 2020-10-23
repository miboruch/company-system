import { CompanyInterface } from './modelsTypes';

export const SET_LOADING = 'SET_LOADING';
export const SET_ALL_USER_COMPANIES = 'SET_ALL_USER_COMPANIES';
export const SET_CURRENT_COMPANY = 'SET_CURRENT_COMPANY';
export const SET_COMPANIES_ERROR = 'GET_COMPANIES_ERROR';
export const SET_ADD_COMPANY_OPEN = 'SET_ADD_COMPANY_OPEN';

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SetAllUserCompanies {
  type: typeof SET_ALL_USER_COMPANIES;
  payload: CompanyInterface[];
}

export interface SetCurrentCompany {
  type: typeof SET_CURRENT_COMPANY;
  payload: CompanyInterface | null;
}

export interface SetCompaniesError {
  type: typeof SET_COMPANIES_ERROR;
  payload: string | null;
}

export interface SetAddCompanyOpen {
  type: typeof SET_ADD_COMPANY_OPEN;
  payload: boolean;
}

export type CompanyActionTypes = SetLoading | SetAllUserCompanies | SetCurrentCompany | SetCompaniesError | SetAddCompanyOpen;
