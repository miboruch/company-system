import React from 'react';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import RegisterUserController from '../../components/compound/RegisterUser/RegisterUserController';

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  return (
    <LoginTemplate page={TemplatePage.Register}>
      <RegisterUserController />
    </LoginTemplate>
  );
};

export default RegisterPage;
