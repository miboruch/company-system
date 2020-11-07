import React from 'react';
import { Heading, StyledForm } from '../AccountSettings/AccountSettings.styles';
import { StyledInput } from '../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../styles/shared';
import Button from '../../atoms/Button/Button';
import { Formik } from 'formik';

interface DefaultValues {
  password: string;
  repeatedPassword: string;
}

interface Props {}

const PasswordChangeSettings: React.FC<Props> = () => {
  const initialValues: DefaultValues = {
    password: '',
    repeatedPassword: ''
  };

  const handleSubmit = (values: DefaultValues) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
      {({ handleChange, values }) => (
        <StyledForm>
          <Heading>Zmień hasło</Heading>
          <StyledInput type={'password'} name={'password'} onChange={handleChange} value={values.password} required={true} labelText={'Hasło'} />
          <StyledInput type={'password'} name={'repeatedPassword'} onChange={handleChange} value={values.repeatedPassword} required={true} labelText={'Powtórz hasło'} />
          <DoubleFlexWrapper>
            <Button type={'submit'} text={'Zapisz'} disabled={values.password !== values.repeatedPassword} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default PasswordChangeSettings;
