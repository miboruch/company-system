import React, { useContext } from 'react';
import { PageContext, PageSettingEnum } from '../context/PageContext';

interface Props {
  pageIndex: PageSettingEnum;
  children: React.ReactNode;
}

const AddClientTemplate: React.FC<Props> = ({ pageIndex, children }) => {
  const { currentPage } = useContext(PageContext);

  return <>{currentPage === pageIndex && children}</>;
};

export default AddClientTemplate;
