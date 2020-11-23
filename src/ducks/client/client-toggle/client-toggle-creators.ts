import { ClientInterface } from '../../../types/modelsTypes';
import { setClientInfoOpen } from '../../../actions/clientActions';
import { AppDispatch } from '../../../store/test-store';
import { setSelectedClient } from './client-toggle';

export const selectClient = (client: ClientInterface | null) => (dispatch: AppDispatch) => {
  dispatch(setSelectedClient(client));
  dispatch(setClientInfoOpen(!!client));
};
