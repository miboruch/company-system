import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { Wrapper } from './AddCompanyTemplate.styles';

interface Props {
  pageIndex: number;
  children: React.ReactNode;
}

const AddCompanyTemplate: React.FC<Props> = ({ pageIndex, children }) => {
  const { currentPage } = useContext(PageContext);
  return <>{currentPage === pageIndex && <Wrapper>{children}</Wrapper>}</>;
};

export default AddCompanyTemplate;
