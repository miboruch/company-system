import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Button from '../../atoms/Button/Button';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { editPassword } from '../../../actions/authenticationActions';
import { Heading, StyledForm } from '../AccountSettings/AccountSettings.styles';
import { StyledInput } from '../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../styles/shared';

interface DefaultValues {
  password: string;
  repeatedPassword: string;
}

type ConnectedProps = LinkDispatchProps;

const PasswordChangeSettings: React.FC<ConnectedProps> = ({ editPassword }) => {
  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
  const [isRepeatedPasswordShown, setRepeatedPasswordShown] = useState<boolean>(false);

  const initialValues: DefaultValues = {
    password: '',
    repeatedPassword: ''
  };

  const handleSubmit = ({ password, repeatedPassword }: DefaultValues) => {
    editPassword(password, repeatedPassword);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
      {({ handleChange, values }) => (
        <StyledForm>
          <Heading>Zmień hasło</Heading>
          <StyledInput
            type={isPasswordShown ? 'text' : 'password'}
            name={'password'}
            togglePasswordInputType={() => setPasswordShown(!isPasswordShown)}
            isPassword={true}
            onChange={handleChange}
            value={values.password}
            required={true}
            labelText={'Hasło'}
          />
          <StyledInput
            type={isRepeatedPasswordShown ? 'text' : 'password'}
            name={'repeatedPassword'}
            togglePasswordInputType={() => setRepeatedPasswordShown(!isRepeatedPasswordShown)}
            isPassword={true}
            onChange={handleChange}
            value={values.repeatedPassword}
            required={true}
            labelText={'Powtórz hasło'}
          />
          <DoubleFlexWrapper>
            <Button type={'submit'} text={'Zapisz'} disabled={values.password !== values.repeatedPassword} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

interface LinkDispatchProps {
  editPassword: (password: string, repeatedPassword: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    editPassword: bindActionCreators(editPassword, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(PasswordChangeSettings);
