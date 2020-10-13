import React, { useState } from 'react';

type PageContextType = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PageContext = React.createContext<PageContextType>({
  currentPage: 0,
  setCurrentPage: (page) => {}
});

interface Props {
  children: React.ReactNode;
}

const PageContextProvider: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  return <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>;
};

export default PageContextProvider;
