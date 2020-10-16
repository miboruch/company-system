import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import DatePicker from 'react-datepicker';
import { RegisterDataContext } from '../context/RegisterDataContext';
import Input from '../../../atoms/Input/Input';
import { StyledForm, Heading } from '../../../../pages/LoginPage/LoginPage.styles';
import { FlexWrapper, Title, StyledLabel, DoubleFlexWrapper } from '../../../../styles/sharedStyles';
import styled from 'styled-components';
import Button from '../../../atoms/Button/Button';

import 'react-datepicker/dist/react-datepicker.css';
import { PageContext } from '../context/PageContext';

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

type defaultValues = {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date | undefined | null;
};

const MainRegisterDataPage: React.FC = () => {
  const { data, setData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    email: data.email ? data.email : '',
    name: data.name ? data.name : '',
    lastName: data.lastName ? data.lastName : '',
    dateOfBirth: data.dateOfBirth ? data.dateOfBirth : null
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(currentPage + 1);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values, setFieldValue }) => (
        <StyledForm>
          <Heading>Wypełnij dane</Heading>
          <StyledInput onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={'Email'} />
          <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'string'} labelText={'Imię'} />
          <StyledInput onChange={handleChange} name={'lastName'} value={values.lastName} required={true} type={'string'} labelText={'Nazwisko'} />
          {/*<DoubleFlexWrapper style={{ marginBottom: '3rem' }}>*/}
          <div>
            <StyledLabel>Data urodzenia</StyledLabel>
            <DatePicker selected={values.dateOfBirth} onChange={(date) => setFieldValue('dateOfBirth', date)} />
          </div>
          {/*</DoubleFlexWrapper>*/}
          <FlexWrapper>
            <Button type={'submit'} text={'Dalej'} />
          </FlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default MainRegisterDataPage;
