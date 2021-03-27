import { PasswordData } from '../../context/RegisterDataContext';

export const passwordValues = (passwordData?: PasswordData): PasswordData => ({
  password: passwordData?.password || '',
  repeatedPassword: passwordData?.repeatedPassword || ''
});
