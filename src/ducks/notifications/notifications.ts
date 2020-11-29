import { NotificationInterface } from '../../types/modelsTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserNotifications } from './notifications-creators';

interface InitialStateInterface {
  areNotificationsLoading: boolean;
  notifications: NotificationInterface[];
  notificationsError: string | undefined;
}

const initialState: InitialStateInterface = {
  areNotificationsLoading: false,
  notifications: [],
  notificationsError: undefined
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserNotifications.pending.type, (state) => {
      state.areNotificationsLoading = true;
      state.notificationsError = undefined;
    });
    builder.addCase(getUserNotifications.fulfilled.type, (state, { payload }: PayloadAction<NotificationInterface[]>) => {
      state.areNotificationsLoading = false;
      state.notifications = payload;
    });
    builder.addCase(getUserNotifications.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areNotificationsLoading = false;
      state.notificationsError = payload;
    });
  }
});

export default notificationSlice.reducer;
