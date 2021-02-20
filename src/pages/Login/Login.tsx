import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import { FormField, Spinner, Button } from 'components';
import { useSubmit } from 'components/hooks';
import { login, LoginData } from 'api';
import { AppState, useAppDispatch } from 'store/store';
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
} from 'pages/Login/Login.styles';
import { setTokens } from 'ducks/auth/tokens/tokens';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isLoginLoading, loginError } = useSelector((state: AppState) => state.auth.login);

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit<typeof login, LoginData>(login);

  onSubmitSuccess((payload) => {
    if (payload) {
      const { token, refreshToken } = payload;
      dispatch(setTokens({ token, refreshToken }));
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

export default Login;
