import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { RegisterDataContext } from '../context/RegisterDataContext';
import Input from '../../../atoms/Input/Input';
import { StyledForm } from '../../../../pages/LoginPage/LoginPage.styles';
import { FlexWrapper, Title } from '../../../../styles/sharedStyles';
import styled from 'styled-components';
import Button from '../../../atoms/Button/Button';

type defaultValues = {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date | string;
};

const MainRegisterDataPage: React.FC = () => {
  const { data, setData } = useContext(RegisterDataContext);

  const initialValues: defaultValues = {
    email: data.email ? data.email : '',
    name: data.name ? data.name : '',
    lastName: data.lastName ? data.lastName : '',
    dateOfBirth: data.dateOfBirth ? data.dateOfBirth : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values, setFieldValue }) => (
        <StyledForm>
          <Title>Wypełnij dane</Title>
          <Input onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={'Email'} />
          <Input onChange={handleChange} name={'name'} value={values.name} required={true} type={'string'} labelText={'Imię'} />
          <Input onChange={handleChange} name={'lastName'} value={values.lastName} required={true} type={'string'} labelText={'Nazwisko'} />
          <FlexWrapper>
            <Button type={'submit'} text={'Dalej'} />
          </FlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default MainRegisterDataPage;
