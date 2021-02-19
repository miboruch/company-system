import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import { FormField, Spinner, Button } from 'components';
import { useSubmit } from 'components/hooks';
import { login, LoginData } from 'api';
import { AppState } from 'store/store';
import { LoginSchema } from 'validation/loginValidation';

import { ErrorParagraph } from 'styles/typography/typography';
import { SpinnerWrapper } from 'styles/shared';
import {
  AccountParagraph,
  AuthWrapper,
  FlexWrapper,
  FlexWrapperDefault,
  Heading,
  StyledForm,
  StyledLink
} from './LoginPage.styles';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { isLoginLoading, loginError } = useSelector((state: AppState) => state.auth.login);

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit<typeof login, LoginData>(login);

  onSubmitSuccess(() => {
    history.push('/select');
  });

  const initialValues: LoginData = {
    email: '',
    password: ''
  };

  return (
    <LoginTemplate page={TemplatePage.Login}>
      <AuthWrapper>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={LoginSchema}>
          {({ isSubmitting }) => (
            <StyledForm>
              {isLoginLoading ? (
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              ) : (
                <>
                  <Heading>Zaloguj się do panelu</Heading>
                  <FormField type={'email'} name={'email'} required={true} label={'Email'} style={{ marginBottom: '5rem' }} />
                  <FormField type={'password'} name={'password'} required={true} label={'Hasło'} />
                  <FlexWrapper>
                    <Button type={'submit'} disabled={isSubmitting}>
                      Zaloguj
                    </Button>
                  </FlexWrapper>
                  <FlexWrapperDefault>
                    <AccountParagraph>
                      Nie masz konta? <StyledLink to={'/register'}>zarejestruj się</StyledLink>
                    </AccountParagraph>
                  </FlexWrapperDefault>
                  <ErrorParagraph isVisible={!!loginError}>{loginError}</ErrorParagraph>
                </>
              )}
            </StyledForm>
          )}
        </Formik>
      </AuthWrapper>
    </LoginTemplate>
  );
};

export default LoginPage;
