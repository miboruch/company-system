import React, { useContext } from 'react';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';

import Button from 'components/atoms/Button/Button';

import { RegisterDataContext } from '../context/RegisterDataContext';
import { StyledForm, Heading } from 'pages/Login/Login.styles';
import { FlexWrapper, StyledLabel } from 'styles/shared';
import { StyledInput } from 'pages/Login/Login.styles';
import { MainRegisterDataSchema } from '../validation/validation';

import 'react-datepicker/dist/react-datepicker.css';
import { PageContext } from '../context/PageContext';

type defaultValues = {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date | undefined | null;
};

interface Props {
  isRegistrationLink: boolean;
}

const MainRegisterData: React.FC<Props> = ({ isRegistrationLink }) => {
  const { data, setData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    email: data?.email || '',
    name: data?.name || '',
    lastName: data?.lastName || '',
    dateOfBirth: data?.dateOfBirth || null
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(currentPage + 1);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={MainRegisterDataSchema} validateOnChange={false} validateOnBlur={false}>
      {({ handleChange, values, setFieldValue, errors }) => (
        <StyledForm>
          <Heading>Wypełnij dane</Heading>
          <StyledInput onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={errors.email || 'Email'} disabled={isRegistrationLink} />
          <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'string'} labelText={errors.name || 'Imię'} />
          <StyledInput onChange={handleChange} name={'lastName'} value={values.lastName} required={true} type={'string'} labelText={errors.lastName || 'Nazwisko'} />
          <div>
            <StyledLabel>{errors.dateOfBirth || 'Data urodzenia'}</StyledLabel>
            <DatePicker selected={values.dateOfBirth} onChange={(date) => setFieldValue('dateOfBirth', date)} dateFormat={'dd/MM/yyyy'} />
          </div>
          <FlexWrapper>
            <Button type={'submit'} text={'Dalej'} />
          </FlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default MainRegisterData;
