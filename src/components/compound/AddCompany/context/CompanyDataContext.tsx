import React, { useState } from 'react';

export interface CompanyDataInterface {
  email?: string;
  name?: string;
  nip?: string;
  address?: string;
  city?: string;
  country?: string;
  lat?: number;
  long?: number;
  phoneNumber?: string;
}

type RegisterDataContextType = {
  data: CompanyDataInterface;
  setData: (data: object) => void;
};

export const CompanyDataContext = React.createContext<RegisterDataContextType>({
  data: {},
  setData: (data: object) => {}
});

interface Props {
  children: React.ReactNode;
}

const CompanyDataContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<CompanyDataInterface>({});
  return <CompanyDataContext.Provider value={{ data, setData }}>{children}</CompanyDataContext.Provider>;
};

export default CompanyDataContextProvider;
