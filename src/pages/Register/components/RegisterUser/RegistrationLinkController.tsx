import React from 'react';

import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import MainRegisterData from './pages/MainRegisterData/MainRegisterData';
import Password from './pages/Password/Password';
import Contact from './pages/Contact/Contact';
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
          <Contact isRegistrationLink={true} token={token} />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegistrationLinkController;
