import fetchMiddleware from 'api/api.middleware';
import { ClientModel, ParamsId, Coords } from 'types';

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

export interface PostClientInfo {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  lat: number;
  long: number;
}

export const postClient = (data: PostClientInfo) =>
  fetchMiddleware({
    method: 'post',
    url: `/client`,
    data
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

export const putClientCoords = (clientId: ParamsId) => (data: Coords) =>
  fetchMiddleware({
    method: 'put',
    url: `/client/coords/${clientId}`,
    data
  });

export const deleteClient = (clientId: ParamsId) =>
  fetchMiddleware<{id: string}>({
    method: 'delete',
    url: `/client/${clientId}`
  });
