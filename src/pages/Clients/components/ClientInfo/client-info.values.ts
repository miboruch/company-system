import { ClientModel } from 'types';
import { PutClientInfo } from 'api';

export const prepareClientValues = (client: ClientModel | null): PutClientInfo => ({
  name: client?.name || '',
  email: client?.email || '',
  phoneNumber: client?.phoneNumber || '',
  address: client?.address || '',
  city: client?.city || '',
  country: client?.country || ''
});
