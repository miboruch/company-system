import { API_URL } from '../../utils/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationInterface } from '../../types/modelsTypes';
import { baseStoreType } from '../../store/store';
import { authApi } from '../../api';
import { setNotificationMessage } from '../popup/popup';
import { NotificationTypes } from '../../types/globalTypes';

export const getUserNotifications = createAsyncThunk<NotificationInterface[], number, baseStoreType>('notifications/getUserNotifications', async (page, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      const { data } = await authApi.get(`/notification/get-notifications?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data as NotificationInterface[];
    } else {
      return rejectWithValue('Brak uwierzytelnienia');
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const checkAsOpen = createAsyncThunk<void, string, baseStoreType>('notifications/checkAsOpen', async (notificationId, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await authApi.put(
        `/notification/check-as-open`,
        {
          notificationId: notificationId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getUserNotifications(1));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

export const deleteNotification = createAsyncThunk<void, string, baseStoreType>('notifications/deleteNotification', async (notificationId, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await authApi.delete(`/notification/delete-notification/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(getUserNotifications(1));
      dispatch(setNotificationMessage({ message: 'Usunięto powiadomienie' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});
