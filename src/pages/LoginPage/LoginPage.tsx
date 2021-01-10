import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import Spinner from '../../components/atoms/Spinner/Spinner';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';

import { AppState } from 'store/store';
import { useAppDispatch } from 'store/store';
import { LoginSchema } from 'validation/loginValidation';
// import {login} from 'api/auth/auth';
import { login } from 'ducks/auth/login/login-creators';
import { AccountParagraph, AuthWrapper, FlexWrapper, FlexWrapperDefault, Heading, StyledForm, StyledInput, StyledLink } from './LoginPage.styles';
import { ErrorParagraph } from 'styles/typography/typography';
import { SpinnerWrapper } from 'styles/shared';
import useSubmit from 'hooks/use-submit.hook';

type ConnectedProps = RouteComponentProps<any>;

interface InitialValues {
  email: string;
  password: string;
}

const LoginPage: React.FC<ConnectedProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const { isLoginLoading, loginError } = useSelector((state: AppState) => state.auth.login);

  // const {onSubmit, onSubmitSuccess, onSubmitError} = useSubmit<typeof login, InitialValues>(login);
  //
  // onSubmitSuccess((payload, values) => {
  //   console.log(payload);
  //   console.log(values);
  // });
  //
  // onSubmitError((error) => {
  //   console.log(error);
  // })

  const initialValues: InitialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = ({ email, password }: InitialValues): void => {
    dispatch(login({ email, password, callback: () => history.push('/select') }));
  };

  return (
    <LoginTemplate page={TemplatePage.Login}>
      <AuthWrapper>
        {/*handleSubmit*/}
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LoginSchema} validateOnBlur={false} validateOnChange={false}>
          {({ handleChange, values, errors }) => (
            <StyledForm>
              {isLoginLoading ? (
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              ) : (
                <>
                  <Heading>Zaloguj się do panelu</Heading>
                  <StyledInput onChange={handleChange} type={'email'} name={'email'} value={values.email} required={true} labelText={errors.email || 'Email'} />
                  <Input onChange={handleChange} type={'password'} name={'password'} value={values.password} required={true} labelText={errors.password || 'Hasło'} />
                  <FlexWrapper>
                    <Button type={'submit'} text={'Zaloguj'} />
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
