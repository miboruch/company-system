import { MainRegisterInterface } from '../../context/RegisterDataContext';

export const mainRegisterValues = (mainData?: MainRegisterInterface) => ({
  email: mainData?.email || '',
  name: mainData?.name || '',
  lastName: mainData?.lastName || '',
  dateOfBirth: mainData?.dateOfBirth || new Date()
});
