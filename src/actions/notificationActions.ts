import axios from 'axios';
import { NotificationInterface } from '../types/modelsTypes';
import { SET_NOTIFICATIONS, SetNotifications } from '../types/actionTypes/notificationActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { AppState } from '../reducers/rootReducer';
import { API_URL } from '../utils/config';
import { setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';

const setNotifications = (notifications: NotificationInterface[]): SetNotifications => {
  return {
    type: SET_NOTIFICATIONS,
    payload: notifications
  };
};

export const getUserNotifications = (page: number) => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;

  try {
    if (token) {
      const { data } = await axios.get(`${API_URL}/notification/get-notifications?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setNotifications(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkAsOpen = (notificationId: string) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;

  try {
    if (token) {
      await axios.put(
        `${API_URL}/notification/check-as-open`,
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
    console.log(error);
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const deleteNotification = (notificationId: string) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;

  try {
    if (token) {
      await axios.delete(`${API_URL}/notification/delete-notification/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(getUserNotifications(1));
      dispatch(setNotificationMessage('Usunięto powiadomienie'));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};
