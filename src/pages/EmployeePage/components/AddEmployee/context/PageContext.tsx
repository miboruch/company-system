import React, { useState } from 'react';

export enum PageSettingEnum {
  First = 0,
  Second = 1
}

type PageContextType = {
  currentPage: PageSettingEnum;
  setCurrentPage: (page: PageSettingEnum) => void;
};

export const PageContext = React.createContext<PageContextType>({
  currentPage: PageSettingEnum.First,
  setCurrentPage: (page: PageSettingEnum) => {}
});

interface Props {
  children: React.ReactNode;
}

const PageContextProvider: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageSettingEnum>(PageSettingEnum.First);

  return <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>;
};

export default PageContextProvider;
