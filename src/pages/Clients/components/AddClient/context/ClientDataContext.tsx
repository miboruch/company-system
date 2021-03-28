import React, { useState } from 'react';

export interface MainClientData {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface MapData {
  lat: number;
  long: number;
}

type ClientDataContextType = {
  mainData?: MainClientData;
  setMainData: (data: MainClientData) => void;
  mapData?: MapData;
  setMapData: (data: MapData) => void;
};

export const ClientDataContext = React.createContext<ClientDataContextType>({
  mainData: undefined,
  setMainData: (data: MainClientData) => {},
  mapData: undefined,
  setMapData: (data: MapData) => {}
});

interface Props {
  children: React.ReactNode;
}

const ClientDataContextProvider: React.FC<Props> = ({ children }) => {
  const [mainData, setMainData] = useState<MainClientData>();
  const [mapData, setMapData] = useState<MapData>();

  return (
    <ClientDataContext.Provider value={{ mainData, setMainData, mapData, setMapData }}>{children}</ClientDataContext.Provider>
  );
};

export default ClientDataContextProvider;
