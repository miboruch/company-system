import React from 'react';

import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import RegisterUserController from './components/RegisterUser/RegisterUserController';

const Register: React.FC = () => {
  return (
    <LoginTemplate page={TemplatePage.Register}>
      <RegisterUserController />
    </LoginTemplate>
  );
};

export default Register;
