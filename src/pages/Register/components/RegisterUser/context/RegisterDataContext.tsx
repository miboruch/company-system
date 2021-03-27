import React, { useState } from 'react';

export interface MainRegisterInterface {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface PasswordData {
  password: string;
  repeatedPassword: string;
}

type RegisterDataContextType = {
  mainData?: MainRegisterInterface;
  setMainData: (data: MainRegisterInterface) => void;
  passwordData?: PasswordData;
  setPasswordData: (data: PasswordData) => void;
  resetData: () => void;
};

export const RegisterDataContext = React.createContext<RegisterDataContextType>({
  mainData: undefined,
  setMainData: (data: MainRegisterInterface) => {},
  passwordData: undefined,
  setPasswordData: (data: PasswordData) => {},
  resetData: () => {}
});

interface Props {
  children: React.ReactNode;
  isRegistrationLink: boolean;
  email?: string;
}

const RegisterDataContextProvider: React.FC<Props> = ({ children, isRegistrationLink, email }) => {
  const [mainData, setMainData] = useState<MainRegisterInterface>();
  const [passwordData, setPasswordData] = useState<PasswordData>();

  const resetData = () => {
    setMainData(undefined);
    setPasswordData(undefined);
  }

  return (
    <RegisterDataContext.Provider value={{ mainData, setMainData, passwordData, setPasswordData, resetData }}>
      {children}
    </RegisterDataContext.Provider>
  );
};

export default RegisterDataContextProvider;
