import React from 'react';

import RegisterDataContextProvider from 'components/compound/RegisterUser/context/RegisterDataContext';
import PageContextProvider from './context/PageContext';
import RegisterTemplate from 'components/compound/RegisterUser/templates/RegisterTemplate/RegisterTemplate';
import MainRegisterDataPage from 'components/compound/RegisterUser/pages/MainRegisterDataPage';
import PasswordPage from 'components/compound/RegisterUser/pages/PasswordPage';
import ContactDataPage from 'components/compound/RegisterUser/pages/ContactDataPage';

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
