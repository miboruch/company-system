import { setNotification } from 'ducks/popup/popup';
import store from 'store/store';

interface NotificationsReturnData {
  success: (message: string) => void;
  error: (message: string) => void;
}

const Notifications: NotificationsReturnData = {
  success: (message: string) => {
    store.dispatch(setNotification({ message, type: 'success' }));
  },

  error: (message: string) => {
    store.dispatch(setNotification({ message }));
  }
};

export default Notifications;
