import { NotificationTypes } from 'types/globalTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from 'store/store';
import { TaskInterface } from 'types/modelsTypes';
import { companyApi } from 'api';
import { setNotificationMessage } from '../../popup/popup';
import { selectTask } from '../tasks-toggle/tasks-toggle-creators';
import { setSelectedTask, setTaskInfoOpen, setAddNewTaskOpen } from '../tasks-toggle/tasks-toggle';

export const getCompanyTasks = createAsyncThunk<TaskInterface[], void, baseStoreType>(
  'tasksData/getCompanyTasks',
  async (_arg, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        const { data } = await companyApi.get(`/task/company`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data as TaskInterface[];
      } else {
        return rejectWithValue('Brak danych');
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEmployeeTasks = createAsyncThunk<TaskInterface[], void, baseStoreType>(
  'tasksData/getEmployeeTasks',
  async (_arg, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { employeeData } = getState().auth.data;

    try {
      if (token && employeeData) {
        const { data } = await companyApi.get(`/task/get-employee-tasks/${employeeData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data as TaskInterface[];
      } else {
        return rejectWithValue('Brak danych');
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCompletedTasks = createAsyncThunk<number, void, baseStoreType>(
  'tasksData/getCompletedTasks',
  async (_arg, { rejectWithValue, getState }) => {
    const DAYS_BACK = 30;
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        const { data } = await companyApi.get(
          `/task/completed?daysBack=${DAYS_BACK}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return data.completedTasks;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface ChangeTaskStateInterface {
  taskId: string;
  isCompleted: boolean;
}

export const getSingleTask = createAsyncThunk<void, string, baseStoreType>(
  'tasksData/getSingleTask',
  async (taskId, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        //`/task/${taskId}?company_id=${currentCompany._id}`
        const { data } = await companyApi.get(`/task/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        dispatch(setSelectedTask(data));
        dispatch(setNotificationMessage({ message: 'Pobrano zadanie' }));
      } else {
        dispatch(setNotificationMessage({ message: 'Problem z uwierzytelnieniem', notificationType: NotificationTypes.Error }));
      }
    } catch (error) {
      console.log(error);
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);

export const changeTaskState = createAsyncThunk<void, ChangeTaskStateInterface, baseStoreType>(
  'tasksData/changeTaskState',
  async ({ taskId, isCompleted }, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        await companyApi.put(
          `/task/set-task-completed`,
          {
            taskId,
            isCompleted
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(getSingleTask(taskId));
        dispatch(getCompanyTasks());
        dispatch(setNotificationMessage({ message: 'Zaktualizowano zadanie' }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);

interface EditTaskInterface {
  taskId: string;
  date: Date;
  name: string;
  description: string;
  timeEstimate: number;
  taskIncome: number;
  taskExpense: number;
}

export const editTask = createAsyncThunk<void, EditTaskInterface, baseStoreType>(
  'tasksData/editTask',
  async (values, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        await companyApi.put(
          `/task/edit-task`,
          {
            ...values
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(selectTask(null));
        dispatch(getCompanyTasks());
        dispatch(setNotificationMessage({ message: 'Edytowano zadanie' }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);

export const deleteTask = createAsyncThunk<void, string, baseStoreType>(
  'tasksData/deleteTask',
  async (taskId, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        await companyApi.delete(`/task/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        dispatch(getCompanyTasks());
        dispatch(setSelectedTask(null));
        dispatch(setTaskInfoOpen(false));
        dispatch(setNotificationMessage({ message: 'Usunięto zadanie' }));
      } else {
        dispatch(setNotificationMessage({ message: 'Problem z usunięciem zadania', notificationType: NotificationTypes.Error }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);

interface AddNewTaskInterface {
  date: Date;
  timeEstimate: number;
  name: string;
  description: string;
  isCompleted: boolean;
  taskIncome?: number;
  taskExpense?: number;
  clientId?: string | null;
  employees: string[];
}

export const addNewTask = createAsyncThunk<void, AddNewTaskInterface, baseStoreType>(
  'tasksData/addNewTask',
  async (
    { date, timeEstimate, name, description, isCompleted, taskExpense, taskIncome, clientId, employees },
    { dispatch, rejectWithValue, getState }
  ) => {
    const { token } = getState().auth.tokens;

    try {
      if (token) {
        await companyApi.post(
          `/task`,
          {
            date,
            timeEstimate,
            name,
            clientId,
            employees,
            description,
            isCompleted,
            taskIncome: taskIncome ? taskIncome : 0,
            taskExpense: taskExpense ? taskExpense : 0
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(getCompanyTasks());
        dispatch(setAddNewTaskOpen(false));
        dispatch(setNotificationMessage({ message: 'Dodano nowe zadanie' }));
      } else {
        dispatch(setNotificationMessage({ message: 'Problem z dodaniem zadania', notificationType: NotificationTypes.Error }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);

export interface TaskPeriodInterface {
  date: Date;
  totalTasks: number;
}

interface GetTasksPeriodInterface {
  daysBack: number;
  setData: (data: TaskPeriodInterface[]) => void;
}

export const getTasksInTimePeriod = createAsyncThunk<void, GetTasksPeriodInterface, baseStoreType>(
  'tasksData/getTasksInTimePeriod',
  async ({ daysBack, setData }, { getState, rejectWithValue }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (token && currentCompany) {
        const { data } = await companyApi.get(
          `/task/completed-tasks-period?company_id=${currentCompany._id}&daysBack=${daysBack}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setData(data);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
