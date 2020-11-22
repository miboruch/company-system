import {
  CurrencyInterface,
  NotificationMessage,
  SET_CURRENCY,
  SET_EDIT_CLIENT_COORDS_OPEN,
  SET_EDIT_COMPANY_COORDS_OPEN,
  SET_NOTIFICATION_MESSAGE,
  SET_TASK_MAP_PREVIEW_OPEN,
  ToggleActionTypes
} from '../types/actionTypes/toggleAcitonTypes';

interface DefaultState {
  isNotificationOpen: boolean;
  notificationMessage: NotificationMessage | null;
  isEditClientCoordsOpen: boolean;
  isEditCompanyCoordsOpen: boolean;
  isTaskMapPreviewOpen: boolean;
  currency: CurrencyInterface;
}

const initialState: DefaultState = {
  isNotificationOpen: false,
  notificationMessage: null,
  isEditClientCoordsOpen: false,
  isEditCompanyCoordsOpen: false,
  isTaskMapPreviewOpen: false,
  currency: {
    name: 'PLN',
    value: 1
  }
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
    case SET_TASK_MAP_PREVIEW_OPEN:
      return {
        ...state,
        isTaskMapPreviewOpen: action.payload
      };
    case SET_CURRENCY:
      return {
        ...state,
        currency: {
          name: action.payload.name,
          value: action.payload.value
        }
      };
    default:
      return state;
  }
};
