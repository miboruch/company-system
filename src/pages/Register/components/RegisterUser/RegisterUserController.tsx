import React from 'react';

import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import MainRegisterData from './pages/MainRegisterData';
import Password from './pages/Password';
import ContactData from './pages/ContactData';
import RegisterDataContextProvider from './context/RegisterDataContext';

const RegisterUserController: React.FC = () => {
  return (
    <RegisterDataContextProvider isRegistrationLink={false}>
      <PageContextProvider>
        <RegisterTemplate pageIndex={0}>
          <MainRegisterData isRegistrationLink={false} />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={1}>
          <Password />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={2}>
          <ContactData isRegistrationLink={false} />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegisterUserController;
