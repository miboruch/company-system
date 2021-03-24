import { ErrorResponse } from 'api/api.middleware';

export enum Direction {
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export interface Coords {
  lat: number | null;
  long: number | null;
}

export enum NotificationTypes {
  Success = 'success',
  Error = 'error'
}

export interface CurrencyInterface {
  name: string;
  value: number;
}

type Notification = 'success' | 'error';

export interface NotificationMessageTemp {
  notificationType?: NotificationTypes;
  message: string;
}

export interface NotificationMessage{
  notificationType?: Notification;
  message: string | ErrorResponse;
}
