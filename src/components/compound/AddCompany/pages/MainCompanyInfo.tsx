import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Input from '../../../atoms/Input/Input';
import { MobileCompoundTitle } from '../../../../styles/sharedStyles';

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  padding: 0 2rem;
`;

type defaultValues = {
  name: string;
  nip: string;
  email: string;
  phoneNumber: string;
};

interface Props {}

const MainCompanyInfo: React.FC<Props> = () => {
  const initialValues: defaultValues = {
    name: '',
    nip: '',
    email: '',
    phoneNumber: ''
  };

  const handleSubmit = (values: defaultValues): void => {
    console.log(values);
    console.log('set to context');
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values }) => (
        <StyledForm>
          <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
          <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'text'} labelText={'Naza firmy'} />
        </StyledForm>
      )}
    </Formik>
  );
};

export default MainCompanyInfo;
