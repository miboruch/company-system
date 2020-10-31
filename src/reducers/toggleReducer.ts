import { SET_NOTIFICATION_MESSAGE, ToggleActionTypes, NotificationMessage } from '../types/actionTypes/toggleAcitonTypes';

interface DefaultState {
  isNotificationOpen: boolean;
  notificationMessage: NotificationMessage | null;
}

const initialState: DefaultState = {
  isNotificationOpen: false,
  notificationMessage: null
};

export const toggleReducer = (state = initialState, action: ToggleActionTypes) => {
  switch (action.type) {
    case SET_NOTIFICATION_MESSAGE:
      return {
        ...state,
        isNotificationOpen: !!action.message,
        notificationMessage: { notificationType: action.notificationType, message: action.message }
      };
    default:
      return state;
  }
};
