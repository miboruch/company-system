import React from 'react';
import RegisterDataContextProvider from './context/RegisterDataContext';
import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import MainRegisterDataPage from './pages/MainRegisterDataPage';
import PasswordPage from './pages/PasswordPage';
import ContactDataPage from './pages/ContactDataPage';

const RegisterUserController: React.FC = () => {
  return (
    <RegisterDataContextProvider isRegistrationLink={false}>
      <PageContextProvider>
        <RegisterTemplate pageIndex={0}>
          <MainRegisterDataPage isRegistrationLink={false} />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={1}>
          <PasswordPage />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={2}>
          <ContactDataPage isRegistrationLink={false} />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegisterUserController;
