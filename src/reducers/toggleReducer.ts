import { NotificationMessage, SET_EDIT_CLIENT_COORDS_OPEN, SET_EDIT_COMPANY_COORDS_OPEN, SET_NOTIFICATION_MESSAGE, ToggleActionTypes } from '../types/actionTypes/toggleAcitonTypes';

interface DefaultState {
  isNotificationOpen: boolean;
  notificationMessage: NotificationMessage | null;
  isEditClientCoordsOpen: boolean;
  isEditCompanyCoordsOpen: boolean;
}

const initialState: DefaultState = {
  isNotificationOpen: false,
  notificationMessage: null,
  isEditClientCoordsOpen: false,
  isEditCompanyCoordsOpen: false
};

export const toggleReducer = (state = initialState, action: ToggleActionTypes) => {
  switch (action.type) {
    case SET_NOTIFICATION_MESSAGE:
      return {
        ...state,
        isNotificationOpen: !!action.message,
        notificationMessage: { notificationType: action.notificationType, message: action.message }
      };
    case SET_EDIT_CLIENT_COORDS_OPEN:
      return {
        ...state,
        isEditClientCoordsOpen: action.payload
      };
    case SET_EDIT_COMPANY_COORDS_OPEN:
      return {
        ...state,
        isEditCompanyCoordsOpen: action.payload
      };
    default:
      return state;
  }
};
