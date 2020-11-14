export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';
export const SET_EDIT_CLIENT_COORDS_OPEN = 'SET_EDIT_CLIENT_COORDS_OPEN';
export const SET_EDIT_COMPANY_COORDS_OPEN = 'SET_EDIT_COMPANY_COORDS_OPEN';
export const SET_TASK_MAP_PREVIEW_OPEN = 'SET_TASK_MAP_PREVIEW_OPEN';

export enum NotificationTypes {
  Success = 'success',
  Error = 'error'
}

export interface NotificationMessage {
  notificationType: NotificationTypes;
  message: string;
}

export interface SetNotificationMessage {
  type: typeof SET_NOTIFICATION_MESSAGE;
  message: string | null;
  notificationType: NotificationTypes | null;
}

export interface SetEditClientCoordsOpen {
  type: typeof SET_EDIT_CLIENT_COORDS_OPEN;
  payload: boolean;
}

export interface SetEditCompanyCoordsOpen {
  type: typeof SET_EDIT_COMPANY_COORDS_OPEN;
  payload: boolean;
}

export interface SetTaskMapPreviewOpen {
  type: typeof SET_TASK_MAP_PREVIEW_OPEN;
  payload: boolean;
}

export type ToggleActionTypes = SetNotificationMessage | SetEditClientCoordsOpen | SetEditCompanyCoordsOpen | SetTaskMapPreviewOpen;
