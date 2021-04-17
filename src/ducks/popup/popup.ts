import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationMessage, NotificationMessageTemp, NotificationTypes } from 'types/globalTypes';

interface InitialStateInterface {
  isNotificationOpen: boolean;
  notificationMessage: NotificationMessage | null;
}

const initialState: InitialStateInterface = {
  isNotificationOpen: false,
  notificationMessage: null
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setNotificationMessage: (state, { payload }: PayloadAction<NotificationMessageTemp>) => {
      state.isNotificationOpen = !!payload.message;
      state.notificationMessage = {
        type: payload.notificationType || NotificationTypes.Success,
        message: payload.message
      };
    },
    setNotification: (state, { payload }: PayloadAction<NotificationMessage>) => {
      state.isNotificationOpen = !!payload.message;
      state.notificationMessage = { type: payload.type || 'error', message: payload.message };
    }
  }
});

export const { setNotificationMessage, setNotification } = popupSlice.actions;

export default popupSlice.reducer;
