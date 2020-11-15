import React, { useContext } from 'react';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import { RegisterDataContext } from '../context/RegisterDataContext';
import { StyledForm, Heading } from '../../../../pages/LoginPage/LoginPage.styles';
import { FlexWrapper, StyledLabel } from '../../../../styles/shared';
import Button from '../../../atoms/Button/Button';
import { StyledInput } from '../../../../pages/LoginPage/LoginPage.styles';

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

const MainRegisterDataPage: React.FC<Props> = ({ isRegistrationLink }) => {
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values, setFieldValue }) => (
        <StyledForm>
          <Heading>Wypełnij dane</Heading>
          <StyledInput onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={'Email'} disabled={isRegistrationLink} />
          <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'string'} labelText={'Imię'} />
          <StyledInput onChange={handleChange} name={'lastName'} value={values.lastName} required={true} type={'string'} labelText={'Nazwisko'} />
          <div>
            <StyledLabel>Data urodzenia</StyledLabel>
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

export default MainRegisterDataPage;
