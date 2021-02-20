import React from 'react';

import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import RegisterDataContextProvider from './context/RegisterDataContext';
import MainRegisterData from './pages/MainRegisterData/MainRegisterData';
import Password from './pages/Password/Password';
import Contact from './pages/Contact/Contact';

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
          <Contact isRegistrationLink={false} />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegisterUserController;
