import React, { useState } from 'react';

export interface MainCompanyData {
  name: string;
  nip: string;
  email: string;
  phoneNumber: string;
}

export interface MapData {
  lat: number;
  long: number;
}

type CompanyDataContextType = {
  mainData?: MainCompanyData;
  setMainData: (data: MainCompanyData) => void;
  mapData?: MapData;
  setMapData: (data: MapData) => void;
};

export const CompanyDataContext = React.createContext<CompanyDataContextType>({
  mainData: undefined,
  setMainData: (data: MainCompanyData) => {},
  mapData: undefined,
  setMapData: (data: MapData) => {}
});

interface Props {
  children: React.ReactNode;
}

const CompanyDataContextProvider: React.FC<Props> = ({ children }) => {
  const [mainData, setMainData] = useState<MainCompanyData>();
  const [mapData, setMapData] = useState<MapData>();

  return (
    <CompanyDataContext.Provider value={{ mainData, setMainData, mapData, setMapData }}>{children}</CompanyDataContext.Provider>
  );
};

export default CompanyDataContextProvider;
