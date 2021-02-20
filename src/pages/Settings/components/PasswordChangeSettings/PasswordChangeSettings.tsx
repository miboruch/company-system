import React, { useState } from 'react';
import { Formik } from 'formik';

import { Button } from 'components';
import { useAppDispatch } from 'store/store';
import { editPassword } from 'ducks/auth/account/account-creators';

import { Heading, StyledForm } from '../AccountSettings/AccountSettings.styles';
import { StyledInput } from 'styles/compoundStyles';
import { DoubleFlexWrapper } from 'styles/shared';

interface DefaultValues {
  password: string;
  repeatedPassword: string;
}

const PasswordChangeSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
  const [isRepeatedPasswordShown, setRepeatedPasswordShown] = useState<boolean>(false);

  const initialValues: DefaultValues = {
    password: '',
    repeatedPassword: ''
  };

  const handleSubmit = ({ password, repeatedPassword }: DefaultValues) => {
    dispatch(editPassword({ password, repeatedPassword }));
  };

  const togglePasswordInput = () => setPasswordShown(!isPasswordShown);
  const toggleRepeatedPasswordInput = () => setRepeatedPasswordShown(!isRepeatedPasswordShown);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
      {({ handleChange, values, isSubmitting }) => (
        <StyledForm>
          <Heading>Zmień hasło</Heading>
          <StyledInput
            type={isPasswordShown ? 'text' : 'password'}
            name={'password'}
            togglePasswordInputType={togglePasswordInput}
            isPassword={true}
            onChange={handleChange}
            value={values.password}
            required={true}
            labelText={'Hasło'}
          />
          <StyledInput
            type={isRepeatedPasswordShown ? 'text' : 'password'}
            name={'repeatedPassword'}
            togglePasswordInputType={toggleRepeatedPasswordInput}
            isPassword={true}
            onChange={handleChange}
            value={values.repeatedPassword}
            required={true}
            labelText={'Powtórz hasło'}
          />
          <DoubleFlexWrapper>
            <Button type={'submit'} disabled={values.password !== values.repeatedPassword || isSubmitting}>
              Zapisz
            </Button>
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default PasswordChangeSettings;
