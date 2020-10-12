import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import { AppTypes } from '../../types/appActionTypes';
import { userLogin } from '../../actions/authenticationActions';
import { StyledWrapper, StyledInput, StyledForm, Heading, FlexWrapper } from './LoginPage.styles';

type ConnectedProps = RouteComponentProps<any> & LinkDispatchProps;

interface InitialValues {
  email: string;
  password: string;
}

const LoginPage: React.FC<ConnectedProps> = ({ history, userLogin }) => {
  const initialValues: InitialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = (values: InitialValues): void => {
    userLogin(values.email, values.password, () => history.push('/'));
  };

  return (
    <StyledWrapper>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, values }) => (
          <StyledForm>
            <Heading>Panel pracownika firmy</Heading>
            <StyledInput onChange={handleChange} type={'email'} name={'email'} value={values.email} required={true} labelText={'Email'} />
            <Input onChange={handleChange} type={'password'} name={'password'} value={values.password} required={true} labelText={'Hasło'} />
            <FlexWrapper>
              <Button type={'submit'} text={'Zaloguj'} />
            </FlexWrapper>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

interface LinkDispatchProps {
  userLogin: (email: string, password: string, successCallback: () => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
