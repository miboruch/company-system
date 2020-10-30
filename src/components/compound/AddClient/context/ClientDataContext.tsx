import React, { useState } from 'react';

export interface ClientDataInterface {
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

type ClientDataContextType = {
  data: ClientDataInterface;
  setData: (data: object) => void;
};

export const ClientDataContext = React.createContext<ClientDataContextType>({
  data: {},
  setData: (data: object) => {}
});

interface Props {
  children: React.ReactNode;
}

const ClientDataContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<ClientDataInterface>({});
  return <ClientDataContext.Provider value={{ data, setData }}>{children}</ClientDataContext.Provider>;
};

export default ClientDataContextProvider;
