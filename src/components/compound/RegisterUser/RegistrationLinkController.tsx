import React from 'react';
import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import MainRegisterDataPage from './pages/MainRegisterDataPage';
import PasswordPage from './pages/PasswordPage';
import ContactDataPage from './pages/ContactDataPage';
import RegisterDataContextProvider from './context/RegisterDataContext';

interface Props {}

const RegistrationLinkController: React.FC<Props> = () => {
  return (
    <RegisterDataContextProvider isRegistrationLink={true}>
      <PageContextProvider>
        <RegisterTemplate pageIndex={0}>
          <MainRegisterDataPage isRegistrationLink={true} />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={1}>
          <PasswordPage />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={2}>
          <ContactDataPage isRegistrationLink={true} />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegistrationLinkController;
