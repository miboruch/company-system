import axios from 'axios';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { API_URL } from '../../../utils/config';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
import { adminApi, authApi } from '../../../api';
import { setNotificationMessage } from '../../popup/popup';
import { setSelectedEmployee, setEmployeeInfoOpen } from '../employees-toggle/employees-toggle';

export interface AllCompanyEmployeesReturnInterface {
  employees: EmployeeDataInterface[];
  employeesCounter: number;
}

export const getAllCompanyEmployees = createAsyncThunk<AllCompanyEmployeesReturnInterface, void, baseStoreType>('employeesData/getAllCompanyEmployees', async (_arg, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { role } = getState().auth.roles;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany && token) {
      const { data } = await axios.get(
        role === UserRole.Admin ? `${API_URL}/employee/get-company-employees?company_id=${currentCompany._id}` : `${API_URL}/employee/employee-data?company_id=${currentCompany._id}`,
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
});

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
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (selectedEmployee && token && currentCompany) {
        const data: DataHourInterface | DataMonthlyInterface = pricePerHour
          ? {
              employeeId: selectedEmployee._id,
              pricePerHour: pricePerHour
            }
          : {
              employeeId: selectedEmployee._id,
              monthlyPrice: monthlyPrice
            };

        await adminApi.put('/employee/update-employee', data);

        // await axios.put(`${API_URL}/employee/update-employee?company_id=${currentCompany._id}`, data, {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });

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

export const addNewEmployee = createAsyncThunk<void, AddEmployeeInterface, baseStoreType>('employeesData/addNewEmployee', async (values, { dispatch, rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany && token) {
      // await axios.post(
      //   `${API_URL}/employee/add-employee?company_id=${currentCompany._id}`,
      //   {
      //     ...values
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // );

      await adminApi.post('/employee/add-employee', { ...values });

      dispatch(getAllCompanyEmployees());
      dispatch(setNotificationMessage({ message: 'Dodano nowego pracownika', notificationType: NotificationTypes.Error }));
    } else {
      dispatch(setNotificationMessage({ message: 'Problem z dodaniem nowego pracownika', notificationType: NotificationTypes.Error }));
      return rejectWithValue('Brak uwierzytelnienia');
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});

interface GetEmployeeHoursInterface {
  userId: string;
  monthIndex: number;
  setHours: (hours: number) => void;
}

export const getEmployeeHours = createAsyncThunk<void, GetEmployeeHoursInterface, baseStoreType>(
  'employees/getEmployeeHours',
  async ({ userId, monthIndex, setHours }, {  rejectWithValue, getState }) => {
    const { role } = getState().auth.roles;
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        if (role === UserRole.User) {
          const { data } = await authApi.get(`/attendance/count-user-hours?company_id=${currentCompany._id}&month=${monthIndex}`);

          setHours(data.totalHours);
        } else {
          const { data } = await adminApi.get(`/attendance/get-single-user-hours/${userId}?month=${monthIndex}`);

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
  async ({ userId, monthIndex, setSalary }, {  rejectWithValue, getState }) => {
    const { role } = getState().auth.roles;
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany?._id && token) {
        if (role === UserRole.User) {
          const { data } = await authApi.get(`/attendance/count-user-salary?company_id=${currentCompany._id}&month=${monthIndex}`);

          setSalary(data.salary);
        } else {
          const { data } = await adminApi.get(`/attendance/get-single-user-salary/${userId}?month=${monthIndex}`);

          setSalary(data.salary);
        }
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/*
export const getEmployeeSalary = (userId: string, monthIndex: number, setSalary: (hours: number) => void) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token, role } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    dispatch(setEmployeeLoading(true));
    if (currentCompany?._id && token) {
      if (role === UserRole.User) {
        const { data } = await axios.get(`${API_URL}/attendance/count-user-salary?company_id=${currentCompany._id}&month=${monthIndex}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSalary(data.salary);
      } else {
        const { data } = await axios.get(`${API_URL}/attendance/get-single-user-salary/${userId}?company_id=${currentCompany._id}&month=${monthIndex}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSalary(data.salary);
      }
    }
    dispatch(setEmployeeLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setEmployeeLoading(false));
  }
};
 */
