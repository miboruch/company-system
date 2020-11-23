import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/config';
import { NotificationTypes } from '../../types/actionTypes/toggleAcitonTypes';
import { baseStoreType } from '../../store/test-store';
import { setNotificationMessage } from '../popup/popup';
import { getSingleDayAttendance } from './attendance-data/attendance-data-creators';
import { adminApi } from '../../api';

interface AddAttendanceInterface {
  userId: string;
  date: Date;
  wasPresent: boolean;
  hours: number;
}

export const addAttendance = createAsyncThunk<void, AddAttendanceInterface, baseStoreType>('attendance/addAttendance', async ({ userId, date, wasPresent, hours }, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.post(`${API_URL}/attendance/add-new?company_id=${currentCompany._id}`, {
        userId,
        date,
        wasPresent,
        hours: hours ? hours : 0
      });

      dispatch(setNotificationMessage({ message: 'Dodano obecność' }));
      dispatch(getSingleDayAttendance());
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

interface UpdateAttendanceInterface {
  attendanceId: string;
  wasPresent: boolean;
  hours: number;
}

export const updateAttendance = createAsyncThunk<void, UpdateAttendanceInterface, baseStoreType>('attendance/updateAttendance', async ({ attendanceId, wasPresent, hours }, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.put(`${API_URL}/attendance/add-new?company_id=${currentCompany._id}`, {
        attendanceId,
        wasPresent,
        hours
      });

      dispatch(setNotificationMessage({ message: 'Zaktualizowano obecność' }));
      dispatch(getSingleDayAttendance());
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});
