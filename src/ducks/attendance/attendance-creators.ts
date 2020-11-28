import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTypes } from '../../types/actionTypes/toggleAcitonTypes';
import { baseStoreType } from '../../store/test-store';
import { setNotificationMessage } from '../popup/popup';
import { getSingleDayAttendance } from './attendance-data/attendance-data-creators';
import { authApi } from '../../api';

interface AddAttendanceInterface {
  userId: string;
  date: Date;
  wasPresent: boolean;
  hours: number;
}

export const addAttendance = createAsyncThunk<void, AddAttendanceInterface, baseStoreType>('attendance/addAttendance', async ({ userId, date, wasPresent, hours }, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await authApi.post(
        `/attendance/add-new`,
        {
          userId,
          date,
          wasPresent,
          hours: hours ? hours : 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

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

  try {
    if (token) {
      await authApi.put(
        `/attendance/edit-attendance`,
        {
          attendanceId,
          wasPresent,
          hours
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(setNotificationMessage({ message: 'Zaktualizowano obecność' }));
      dispatch(getSingleDayAttendance());
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});
