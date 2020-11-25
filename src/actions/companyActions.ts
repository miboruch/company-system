import axios from 'axios';
import { CompanyInterface, CompanyOwnersInterface } from '../types/modelsTypes';
import {
  RESET_COMPANY,
  ResetCompany,
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
import { AppState } from '../store/test-store';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';
import { resetAllSelected, setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';
import { getAllCompanyEmployees } from './employeeActions';

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

  const { token } = getState().auth.tokens;
  const { role } = getState().auth.roles;

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
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const setCompany = (currentCompany: CompanyInterface | null, successCallback?: () => void) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setCurrentCompany(currentCompany));
  // !!currentCompany && dispatch(setUserRole(UserRole.Admin));
  !!successCallback && successCallback();
};

export const getSingleCompany = (companyId: string) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      const { data } = await axios.get(`${API_URL}/company/get-company-info/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setCompany(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const editCompany = (name: string, email: string, nip: string, phoneNumber: string, address: string, city: string, country: string) => async (
  dispatch: Dispatch<any>,
  getState: () => AppState
) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany && token) {
      await axios.put(
        `${API_URL}/company/edit-company?company_id=${currentCompany._id}`,
        {
          name,
          email,
          nip,
          phoneNumber,
          address,
          city,
          country
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getSingleCompany(currentCompany._id));
      dispatch(setNotificationMessage('Edytowano firmę'));
    }
  } catch (error) {
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const editCompanyCoords = (lat: number, long: number) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany && token) {
      await axios.put(
        `${API_URL}/company/edit-company-coords?company_id=${currentCompany._id}`,
        {
          lat,
          long
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getSingleCompany(currentCompany._id));
      dispatch(setNotificationMessage('Zapisano koordynacje'));
    }
  } catch (error) {
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const getCompanyOwners = (setCompanyOwners: (owners: CompanyOwnersInterface[]) => void, setLoading: (isLoading: boolean) => void) => async (
  dispatch: Dispatch<any>,
  getState: () => AppState
) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany && token) {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/company/get-company-owners?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCompanyOwners(data.owners);
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const addNewCompanyOwner = (userId: string, callback: () => void) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().companyReducer;
  try {
    if (token && currentCompany) {
      await axios.post(
        `${API_URL}/company/add-company-owner?company_id=${currentCompany._id}`,
        {
          toBeOwnerId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      callback();
      dispatch(setNotificationMessage('Dodano administratora'));
    }
  } catch (error) {
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const removeCompanyOwner = (userId: string, addEmployee: boolean, callback: () => void, pricePerHour?: number, monthlyPrice?: number) => async (
  dispatch: Dispatch<any>,
  getState: () => AppState
) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().companyReducer;
  try {
    if (token && currentCompany) {
      await axios.post(
        `${API_URL}/company/remove-company-owner?company_id=${currentCompany._id}`,
        {
          toBeRemovedId: userId,
          addEmployee,
          pricePerHour,
          monthlyPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      callback();
      addEmployee && dispatch(getAllCompanyEmployees());
      dispatch(setNotificationMessage('Usunięto administratora'));
    }
  } catch (error) {
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const resetCompany = (): ResetCompany => {
  return {
    type: RESET_COMPANY
  };
};
