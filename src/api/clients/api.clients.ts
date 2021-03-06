import { ClientModel } from 'types';
import fetchMiddleware from 'api/api.middleware';

export const fetchClients = () =>
  fetchMiddleware<ClientModel[]>({
    method: 'get',
    url: `/client/get-company-clients`
  });
