import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTypes } from '../../types/globalTypes';
import { baseStoreType } from '../../store/store';
import { setNotificationMessage } from '../popup/popup';
import { getSingleDayAttendance } from './attendance-data/attendance-data-creators';
import { companyApi } from '../../api';

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
      await companyApi.post(
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
      await companyApi.put(
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
