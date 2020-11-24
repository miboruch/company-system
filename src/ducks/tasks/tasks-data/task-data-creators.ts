import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../../store/test-store';
import { TaskInterface } from '../../../types/modelsTypes';
import { adminApi, authApi } from '../../../api';
import { setNotificationMessage } from '../../popup/popup';
import { selectTask } from '../tasks-toggle/tasks-toggle-creators';
import { setSelectedTask, setTaskInfoOpen } from '../tasks-toggle/tasks-toggle';

export const getCompanyTasks = createAsyncThunk<TaskInterface[], void, baseStoreType>('tasksData/getCompanyTasks', async (_arg, { dispatch, rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany && token) {
      const { data } = await authApi.get(`/task/get-company-tasks?company_id=${currentCompany._id}`);

      return data as TaskInterface[];
    } else {
      return rejectWithValue('Brak danych');
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});

export const getCompletedTasks = createAsyncThunk<number, void, baseStoreType>('tasksData/getCompletedTasks', async (_arg, { rejectWithValue, getState }) => {
  const DAYS_BACK = 30;
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany && token) {
      const { data } = await authApi.get(`/task/count-last-completed-tasks?company_id=${currentCompany._id}&daysBack=${DAYS_BACK}`);

      return data.completedTasks;
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

interface ChangeTaskStateInterface {
  taskId: string;
  isCompleted: boolean;
}

export const getSingleTask = createAsyncThunk<void, string, baseStoreType>('tasksData/getSingleTask', async (taskId, { dispatch, rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany && token) {
      const { data } = await authApi.get(`/task/get-single-company-task/${taskId}?company_id=${currentCompany._id}`);

      dispatch(setSelectedTask(data));
      dispatch(setNotificationMessage({ message: 'Pobrano zadanie' }));
    } else {
      dispatch(setNotificationMessage({ message: 'Problem z uwierzytelnieniem', notificationType: NotificationTypes.Error }));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

export const changeTaskState = createAsyncThunk<void, ChangeTaskStateInterface, baseStoreType>(
  'tasksData/changeTaskState',
  async ({ taskId, isCompleted }, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (currentCompany && token) {
        await adminApi.put(`/task/set-task-completed`, {
          taskId,
          isCompleted
        });

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

export const editTask = createAsyncThunk<void, EditTaskInterface, baseStoreType>('tasksData/editTask', async (values, { dispatch, rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany && token) {
      await adminApi.put(`/task/edit-task`, {
        ...values
      });

      dispatch(selectTask(null));
      dispatch(getCompanyTasks());
      dispatch(setNotificationMessage({ message: 'Edytowano zadanie' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

export const deleteTask = createAsyncThunk<void, string, baseStoreType>('tasksData/deleteTask', async (taskId, { dispatch, rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (currentCompany && token) {
      await adminApi.delete(`/task/delete-task/${taskId}`);

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
});
