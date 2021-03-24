import { ClientModel, ParamsId } from 'types';
import fetchMiddleware from 'api/api.middleware';

export const fetchClients = () =>
  fetchMiddleware<ClientModel[]>({
    method: 'get',
    url: `/client/company`
  });

export const fetchClient = (clientId: ParamsId) => () =>
  fetchMiddleware<ClientModel>({
    method: 'get',
    url: `/client/${clientId}`
  });

export interface PutClientInfo {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export const putClient = (clientId: ParamsId) => (data: PutClientInfo) =>
  fetchMiddleware({
    method: 'put',
    url: `/client/${clientId}`,
    data
  });

export const deleteClient = (clientId: ParamsId) =>
  fetchMiddleware({
    method: 'delete',
    url: `/client/${clientId}`
  });
