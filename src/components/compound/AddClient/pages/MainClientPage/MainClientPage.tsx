import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Formik } from 'formik';

import Button from 'components/atoms/Button/Button';

import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ClientDataContext } from '../../context/ClientDataContext';
import { FlexWrapper, StyledLabel } from 'styles/shared';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, StyledInput, Subheading, Wrapper } from 'styles/compoundStyles';
import { MainClientDataSchema } from '../../validation/validation';

type defaultValues = {
  name: string;
  email: string;
  phoneNumber: string;
};

const MainClientPage: React.FC = () => {
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>('');

  const initialValues: defaultValues = {
    name: data?.name || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={MainClientDataSchema} validateOnChange={false} validateOnBlur={false}>
      {({ handleChange, values, setFieldValue, errors }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o kliencie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'text'} labelText={errors.name || 'Nazwa'} />
            <StyledInput onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={errors.email || 'Email'} />
            <div>
              <StyledLabel>{errors.phoneNumber || 'Numer telefonu'}</StyledLabel>
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
            <FlexWrapper>
              <Button type={'submit'} text={'Dalej'} />
            </FlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default MainClientPage;
