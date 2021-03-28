import { setSelectedClient } from './client-toggle';
import { setClientInfoOpen } from './client-toggle';
import { ClientModel } from 'types';
import { AppDispatch } from 'store/store';

export const selectClient = (client: ClientModel | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedClient(client));
  dispatch(setClientInfoOpen(!!client));
};
