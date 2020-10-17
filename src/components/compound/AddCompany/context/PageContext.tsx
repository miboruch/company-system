import React, { useState } from 'react';

type PageContextType = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const PageContext = React.createContext<PageContextType>({
  currentPage: 0,
  setCurrentPage: (page: number) => {}
});

interface Props {
  children: React.ReactNode;
}

const PageContextProvider: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>;
};

export default PageContextProvider;
