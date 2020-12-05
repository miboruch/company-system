import { ClientInterface } from '../../../types/modelsTypes';
import { AppDispatch } from '../../../store/store';
import { setSelectedClient } from './client-toggle';
import { setClientInfoOpen } from './client-toggle';

export const selectClient = (client: ClientInterface | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedClient(client));
  dispatch(setClientInfoOpen(!!client));
};
