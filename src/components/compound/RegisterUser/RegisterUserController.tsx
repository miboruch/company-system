import React from 'react';
import RegisterDataContextProvider from './context/RegisterDataContext';
import PageContextProvider from './context/PageContext';
import RegisterTemplate from './templates/RegisterTemplate/RegisterTemplate';
import MainRegisterDataPage from './pages/MainRegisterDataPage';
import ProgressionBar from './components/ProgressionBar/ProgressionBar';
import PasswordPage from './pages/PasswordPage';

interface Props {}

const RegisterUserController: React.FC<Props> = () => {
  return (
    <RegisterDataContextProvider>
      <PageContextProvider>
        {/*<ProgressionBar allPages={3} />*/}
        <RegisterTemplate pageIndex={0}>
          <MainRegisterDataPage />
        </RegisterTemplate>
        <RegisterTemplate pageIndex={1}>
          <PasswordPage />
        </RegisterTemplate>
      </PageContextProvider>
    </RegisterDataContextProvider>
  );
};

export default RegisterUserController;
