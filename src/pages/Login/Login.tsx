import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import { FormField, Spinner, Button, notifications } from 'components';
import { setTokens } from 'ducks/auth/tokens/tokens';
import { useSubmit, useUser } from 'components/hooks';
import { login, LoginData } from 'api';
import { useAppDispatch } from 'store/store';
import { LoginSchema } from 'validation/loginValidation';

import { SpinnerWrapper, ErrorParagraph } from 'styles';
import {
  AccountParagraph,
  AuthWrapper,
  FlexWrapper,
  FlexWrapperDefault,
  Heading,
  StyledForm,
  StyledLink
} from 'pages/Login/Login.styles';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { setUser } = useUser();
  const [error, setError] = useState<string | null>(null);

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit(login);
  onSubmitError(({ message }) => {
    setError(message);
    notifications.error('Błąd podczas logowania');
  });
  onSubmitSuccess((payload) => {
    if (payload) {
      setError(null);
      const { token, refreshToken, user } = payload;
      dispatch(setTokens({ token, refreshToken }));
      setUser(user);
      history.push('/select');
    }
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
              {isSubmitting ? (
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
                  <ErrorParagraph isVisible={!!error}>{error}</ErrorParagraph>
                </>
              )}
            </StyledForm>
          )}
        </Formik>
      </AuthWrapper>
    </LoginTemplate>
  );
};

export default Login;
