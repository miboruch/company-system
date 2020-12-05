import React from 'react';

import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import RegisterUserController from '../../components/compound/RegisterUser/RegisterUserController';

const RegisterPage: React.FC = () => {
  return (
    <LoginTemplate page={TemplatePage.Register}>
      <RegisterUserController />
    </LoginTemplate>
  );
};

export default RegisterPage;
