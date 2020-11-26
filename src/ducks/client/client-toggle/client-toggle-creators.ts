import { ClientInterface } from '../../../types/modelsTypes';
import { setClientInfoOpen } from '../../../actions/clientActions';
import { AppDispatch } from '../../../store/test-store';
import { setSelectedClient } from './client-toggle';

export const selectClient = (client: ClientInterface | null) => (dispatch: AppDispatch):void => {
  dispatch(setSelectedClient(client));
  dispatch(setClientInfoOpen(!!client));
};
