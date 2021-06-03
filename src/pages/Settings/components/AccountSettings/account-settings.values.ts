import { UserModel } from 'types';

export const accountInitialValues = (user: UserModel | null) => ({
  email: user?.email || '',
  name: user?.name || '',
  lastName: user?.lastName || '',
  dateOfBirth: new Date(user?.dateOfBirth || ''),
  phoneNumber: user?.phoneNumber || '',
  address: user?.address || '',
  city: user?.city || '',
  country: user?.country || ''
});
