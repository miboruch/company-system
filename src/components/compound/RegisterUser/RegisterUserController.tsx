import React from 'react';
import RegisterDataContextProvider from './context/RegisterDataContext';
import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import MainRegisterDataPage from './pages/MainRegisterDataPage';

interface Props {}

const RegisterUserController: React.FC<Props> = () => {
  return (
    <RegisterDataContextProvider>
      <PageContextProvider>
        <RegisterTemplate pageIndex={0}>
          <MainRegisterDataPage />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegisterUserController;
