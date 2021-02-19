import React from 'react';

import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import MainRegisterData from './pages/MainRegisterData';
import Password from './pages/Password';
import ContactData from './pages/ContactData';
import RegisterDataContextProvider from './context/RegisterDataContext';

import { RegistrationVerifyTokenResponse } from 'pages/RegisterFromLink/RegisterFromLink';

interface Props {
  response: RegistrationVerifyTokenResponse;
  token: string;
}

const RegistrationLinkController: React.FC<Props> = ({ response, token }) => {
  return (
    <RegisterDataContextProvider isRegistrationLink={true} email={response.email}>
      <PageContextProvider>
        <RegisterTemplate pageIndex={0}>
          <MainRegisterData isRegistrationLink={true} />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={1}>
          <Password />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={2}>
          <ContactData isRegistrationLink={true} token={token} />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegistrationLinkController;
