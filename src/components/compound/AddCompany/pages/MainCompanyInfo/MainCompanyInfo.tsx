import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Formik } from 'formik';
import Button from '../../../../atoms/Button/Button';
import { FlexWrapper, StyledLabel } from '../../../../../styles/shared';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { Wrapper, StyledForm, StyledInput, MobileCompoundTitle, Subheading, HeadingWrapper } from '../../../../../styles/compoundStyles';
import { MainCompanyDataSchema } from '../../validation/validation';

type defaultValues = {
  name: string;
  nip: string;
  email: string;
  phoneNumber: string;
};

const MainCompanyInfo: React.FC = () => {
  const { data, setData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string | null>(null);

  const initialValues: defaultValues = {
    name: data.name ? data.name : '',
    nip: data.nip ? data.nip : '',
    email: data.email ? data.email : '',
    phoneNumber: data.phoneNumber ? data.phoneNumber : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
    console.log(values);
    console.log('set to context');
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={MainCompanyDataSchema} validateOnBlur={false} validateOnChange={false}>
      {({ handleChange, values, setFieldValue, errors }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'text'} labelText={errors.name || 'Naza firmy'} />
            <StyledInput onChange={handleChange} name={'nip'} value={values.nip} required={true} type={'text'} labelText={errors.nip || 'NIP'} />
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

export default MainCompanyInfo;
