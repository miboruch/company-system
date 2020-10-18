import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Input from '../../../atoms/Input/Input';
import { RegisterDataContext } from '../context/RegisterDataContext';
import { PageContext } from '../context/PageContext';
import { Formik } from 'formik';
import { Heading, StyledForm } from '../../../../pages/LoginPage/LoginPage.styles';
import { BackParagraph, DoubleFlexWrapper, StyledLabel } from '../../../../styles/sharedStyles';
import Button from '../../../atoms/Button/Button';

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

type defaultValues = {
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
};

const ContactDataPage: React.FC = () => {
  const { data, setData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string | null>(null);

  const handlePageBack = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const initialValues: defaultValues = {
    address: data.address || '',
    city: data.city || '',
    country: data.country || '',
    phoneNumber: data.phoneNumber || ''
  };

  const handleSubmit = (values: defaultValues): void => {
    console.log('handle submit - register user');
    // setData({ ...data, ...values });
    // setCurrentPage(currentPage + 1);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values, setFieldValue }) => (
        <StyledForm>
          <Heading>Podaj informacje kontaktowe</Heading>
          <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={'Adres'} />
          <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={'Miasto'} />
          <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={'Państwo'} />
          <div>
            <StyledLabel>Numer telefonu</StyledLabel>
            <NumberFormat
              onValueChange={({ formattedValue, value }) => {
                setFieldValue('phoneNumber', value);
                setFormattedPhoneNumber(formattedValue);
              }}
              name={'phoneNumber'}
              value={formattedPhoneNumber || values.phoneNumber}
              format={'### ### ###'}
              className={'phone-input'}
            />
          </div>
          <DoubleFlexWrapper>
            <BackParagraph onClick={() => handlePageBack()}>Wstecz</BackParagraph>
            <Button type={'submit'} text={'Dalej'} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default ContactDataPage;
