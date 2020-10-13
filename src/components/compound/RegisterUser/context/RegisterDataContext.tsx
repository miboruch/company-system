import React, { useState } from 'react';

type RegisterDataContextType = {
  data: object;
  setData: (data: object) => void;
};

export const RegisterDataContext = React.createContext<RegisterDataContextType>({
  data: {},
  setData: (data) => {}
});

interface Props {
  children: React.ReactNode;
}

const RegisterDataContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<object>({});
  return <RegisterDataContext.Provider value={{ data, setData }}>{children}</RegisterDataContext.Provider>;
};

export default RegisterDataContextProvider;
