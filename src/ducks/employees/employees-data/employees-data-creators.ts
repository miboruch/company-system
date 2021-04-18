import { createAsyncThunk } from '@reduxjs/toolkit';

import { setNotificationMessage } from '../../popup/popup';
import { setSelectedEmployee, setEmployeeInfoOpen } from '../employees-toggle/employees-toggle';

import { UserRole } from '../../auth/roles/roles';
import { NotificationTypes } from 'types/globalTypes';
import { EmployeeModel } from 'types';
import { baseStoreType } from 'store/store';
import { companyApi } from 'api';

export interface AllCompanyEmployeesReturnInterface {
  employees: EmployeeModel[];
  employeesCounter: number;
}

export const getAllCompanyEmployees = createAsyncThunk<AllCompanyEmployeesReturnInterface, void, baseStoreType>(
  'employeesData/getAllCompanyEmployees',
  async (_arg, { rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { role } = getState().auth.roles;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        const { data } = await companyApi.get(
          role === UserRole.Admin ? `/employee/company` : `/employee/employee-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return data as AllCompanyEmployeesReturnInterface;
      } else {
        return rejectWithValue('Brak uwierzytelnienia');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface MainDataInterface {
  employeeId: string;
}
interface DataHourInterface extends MainDataInterface {
  pricePerHour?: number;
}
interface DataMonthlyInterface extends MainDataInterface {
  monthlyPrice?: number;
}

interface UpdateEmployeeSalaryInterface {
  pricePerHour?: number;
  monthlyPrice?: number;
}
export const updateEmployeeSalary = createAsyncThunk<void, UpdateEmployeeSalaryInterface, baseStoreType>(
  'employeesData/updateEmployeeSalary',
  async ({ pricePerHour, monthlyPrice }, { dispatch, rejectWithValue, getState }) => {
    if (!pricePerHour && !monthlyPrice) {
      return rejectWithValue('Brak danych');
    }
    const { selectedEmployee } = getState().employees.employeesToggle;
    const { token } = getState().auth.tokens;

    try {
      if (selectedEmployee && token) {
        const data: DataHourInterface | DataMonthlyInterface = pricePerHour
          ? {
              employeeId: selectedEmployee._id,
              pricePerHour: pricePerHour
            }
          : {
              employeeId: selectedEmployee._id,
              monthlyPrice: monthlyPrice
            };

        await companyApi.put(`/employee/${selectedEmployee._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        dispatch(getAllCompanyEmployees());

        dispatch(setNotificationMessage({ message: 'Zaktualizowano wypłatę pracownika' }));
        dispatch(setSelectedEmployee(null));
        dispatch(setEmployeeInfoOpen(false));
      } else {
        dispatch(setNotificationMessage({ message: 'Problem z aktualizacją', notificationType: NotificationTypes.Error }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
      console.log(error.response);
    }
  }
);

interface AddEmployeeInterface {
  userId: string;
  pricePerHour: number;
  monthlyPrice: number;
}

export const addNewEmployee = createAsyncThunk<void, AddEmployeeInterface, baseStoreType>(
  'employeesData/addNewEmployee',
  async (values, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;

    try {
      if (token) {
        await companyApi.post(
          '/employee',
          { ...values },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(getAllCompanyEmployees());
        dispatch(setNotificationMessage({ message: 'Dodano nowego pracownika', notificationType: NotificationTypes.Error }));
      } else {
        dispatch(
          setNotificationMessage({ message: 'Problem z dodaniem nowego pracownika', notificationType: NotificationTypes.Error })
        );
        return rejectWithValue('Brak uwierzytelnienia');
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.data);
    }
  }
);

interface GetEmployeeHoursInterface {
  userId: string;
  monthIndex: number;
  setHours: (hours: number) => void;
}

export const getEmployeeHours = createAsyncThunk<void, GetEmployeeHoursInterface, baseStoreType>(
  'employees/getEmployeeHours',
  async ({ userId, monthIndex, setHours }, { rejectWithValue, getState }) => {
    const { role } = getState().auth.roles;
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        if (role === UserRole.User) {
          const { data } = await companyApi.get(`/attendance/own-hours?month=${monthIndex}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setHours(data.totalHours);
        } else {
          const { data } = await companyApi.get(`/attendance/hours/${userId}?month=${monthIndex}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setHours(data.totalHours);
        }
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface GetEmployeeSalaryInterface {
  userId: string;
  monthIndex: number;
  setSalary: (hours: number) => void;
}

export const getEmployeeSalary = createAsyncThunk<void, GetEmployeeSalaryInterface, baseStoreType>(
  'employees/getEmployeeSalary',
  async ({ userId, monthIndex, setSalary }, { rejectWithValue, getState }) => {
    const { role } = getState().auth.roles;
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany?._id && token) {
        if (role === UserRole.User) {
          const { data } = await companyApi.get(`/attendance/own-salary?month=${monthIndex}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setSalary(data.salary);
        } else {
          const { data } = await companyApi.get(`/attendance/salary/${userId}?month=${monthIndex}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setSalary(data.salary);
        }
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
