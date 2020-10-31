import { NotificationTypes, SET_NOTIFICATION_MESSAGE, SetNotificationMessage } from '../types/actionTypes/toggleAcitonTypes';

export const setNotificationMessage = (message: string | null, notificationType:NotificationTypes | null = NotificationTypes.Success): SetNotificationMessage => {
  return {
    type: SET_NOTIFICATION_MESSAGE,
    message,
    notificationType
  };
};
