import { MainClientData } from 'pages/Clients/components/AddClient/context/ClientDataContext';

export const clientMainValues = (data?: MainClientData) => ({
  name: data?.name || '',
  email: data?.email || '',
  phoneNumber: data?.phoneNumber || ''
})
