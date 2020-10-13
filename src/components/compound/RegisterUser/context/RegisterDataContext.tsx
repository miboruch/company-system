import React, { useState } from 'react';

interface RegisterDataInterface {
  email?: string;
  name?: string;
  lastName?: string;
  dateOfBirth?: Date | string | null;
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
}

const RegisterDataContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<RegisterDataInterface>({});
  return <RegisterDataContext.Provider value={{ data, setData }}>{children}</RegisterDataContext.Provider>;
};

export default RegisterDataContextProvider;
