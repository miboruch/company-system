import React from 'react';
import LoginTemplate from '../../components/templates/LoginTemplate/LoginTemplate';
import RegisterUserController from '../../components/compound/RegisterUser/RegisterUserController';

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  return (
    <LoginTemplate current={'register'}>
      <RegisterUserController />
    </LoginTemplate>
  );
};

export default RegisterPage;
