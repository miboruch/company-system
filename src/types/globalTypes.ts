import { ErrorResponse } from 'api/api.middleware';

export enum NotificationTypes {
  Success = 'success',
  Error = 'error'
}

type Notification = 'success' | 'error';

export interface NotificationMessageTemp {
  notificationType?: NotificationTypes;
  message: string;
}

export interface NotificationMessage {
  type?: Notification;
  message: string | ErrorResponse;
}
