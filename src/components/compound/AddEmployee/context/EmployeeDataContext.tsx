import React, { useState } from 'react';

export interface EmployeeDataInterface {
  userId?: string;
  pricePerHour?: number,
  monthlyPrice?: number,
  registerWithMail?: boolean;
}

type EmployeeDataContextType = {
  data: EmployeeDataInterface;
  setData: (data: object) => void;
};

export const EmployeeDataContext = React.createContext<EmployeeDataContextType>({
  data: {},
  setData: (data: object) => {}
});

interface Props {
  children: React.ReactNode;
}

const EmployeeDataContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<EmployeeDataInterface>({});
  return <EmployeeDataContext.Provider value={{ data, setData }}>{children}</EmployeeDataContext.Provider>;
};

export default EmployeeDataContextProvider;
