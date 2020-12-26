import React from 'react';

import PageContextProvider from './context/PageContext';
import RegisterTemplate from 'components/compound/RegisterUser/templates/RegisterTemplate/RegisterTemplate';
import MainRegisterDataPage from 'components/compound/RegisterUser/pages/MainRegisterDataPage';
import PasswordPage from 'components/compound/RegisterUser/pages/PasswordPage';
import ContactDataPage from 'components/compound/RegisterUser/pages/ContactDataPage';
import RegisterDataContextProvider from 'components/compound/RegisterUser/context/RegisterDataContext';

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
          <MainRegisterDataPage isRegistrationLink={true} />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={1}>
          <PasswordPage />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={2}>
          <ContactDataPage isRegistrationLink={true} token={token} />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegistrationLinkController;
