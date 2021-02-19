import React, { useState } from 'react';

interface RegisterDataInterface {
  isRegistrationLink?: boolean;
  email?: string;
  name?: string;
  lastName?: string;
  dateOfBirth?: Date | undefined | null;
  password?: string;
  repeatedPassword?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
}

type RegisterDataContextType = {
  data: RegisterDataInterface;
  setData: (data: object) => void;
};

export const RegisterDataContext = React.createContext<RegisterDataContextType>({
  data: {},
  setData: (data: object) => {}
});

interface Props {
  children: React.ReactNode;
  isRegistrationLink: boolean;
  email?: string;
}

const RegisterDataContextProvider: React.FC<Props> = ({ children, isRegistrationLink, email }) => {
  const [data, setData] = useState<RegisterDataInterface>(isRegistrationLink ? {email: email} : {});
  return <RegisterDataContext.Provider value={{ data, setData }}>{children}</RegisterDataContext.Provider>;
};

export default RegisterDataContextProvider;
