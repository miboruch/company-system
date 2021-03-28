import { MainCompanyData } from 'pages/Companies/components/AddCompany/context/CompanyDataContext';

export const mainCompanyValues = (data?: MainCompanyData) => ({
  name: data?.name || '',
  nip: data?.nip || '',
  email: data?.email || '',
  phoneNumber: data?.phoneNumber || ''
});
