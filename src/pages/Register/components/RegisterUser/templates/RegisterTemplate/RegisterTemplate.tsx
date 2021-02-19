import React, { useContext } from 'react';
import { AuthWrapper } from 'pages/Login/Login.styles';
import { PageContext } from '../../context/PageContext';

interface Props {
  pageIndex: number;
  children: React.ReactNode;
}

const RegisterTemplate: React.FC<Props> = ({ children, pageIndex }) => {
  const { currentPage } = useContext(PageContext);
  return <>{currentPage === pageIndex && <AuthWrapper>{children}</AuthWrapper>}</>;
};

export default RegisterTemplate;
