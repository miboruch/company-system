import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import { AppTypes } from '../../types/actionTypes/appActionTypes';
import { userLogin } from '../../actions/authenticationActions';
import { AccountParagraph, AuthWrapper, FlexWrapper, FlexWrapperDefault, Heading, StyledForm, StyledInput, StyledLink } from './LoginPage.styles';
import { AppState } from '../../reducers/rootReducer';
import { ErrorParagraph } from '../../styles/typography/typography';
import { SpinnerWrapper } from '../../styles/shared';
import Spinner from '../../components/atoms/Spinner/Spinner';
import LoginTemplate, { TemplatePage } from '../../components/templates/LoginTemplate/LoginTemplate';
import { LoginSchema } from '../../validation/loginValidation';

type ConnectedProps = RouteComponentProps<any> & LinkDispatchProps & LinkStateProps;

interface InitialValues {
  email: string;
  password: string;
}

const LoginPage: React.FC<ConnectedProps> = ({ history, userLogin, error, isLoading }) => {
  const initialValues: InitialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = (values: InitialValues): void => {
    userLogin(values.email, values.password, () => history.push('/select'));
  };

  return (
    <LoginTemplate page={TemplatePage.Login}>
      <AuthWrapper>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LoginSchema} validateOnBlur={false} validateOnChange={false}>
          {({ handleChange, values, errors }) => (
            <StyledForm>
              {isLoading ? (
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

interface LinkStateProps {
  error: string | null;
  isLoading: boolean;
}

interface LinkDispatchProps {
  userLogin: (email: string, password: string, successCallback: () => void) => void;
}

const mapStateToProps = ({ authenticationReducer: { error, isLoading } }: AppState): LinkStateProps => {
  return { error, isLoading };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
