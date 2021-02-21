import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ClientDataContext } from '../../context/ClientDataContext';
import { MainClientDataSchema } from '../../validation/validation';

import { FlexWrapper } from 'styles';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';

type defaultValues = {
  name: string;
  email: string;
  phoneNumber: string;
};

const MainClientPage: React.FC = () => {
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

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
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={MainClientDataSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o kliencie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <FormField name={'name'} type={'text'} label={'Nazwa'} required={true} spacing={true} />
            <FormField name={'email'} type={'email'} label={'Email'} required={true} spacing={true} />
            <FormField name={'phoneNumber'} type={'phone'} label={'Numer telefonu'} required={true} spacing={true} />
            <FlexWrapper>
              <Button type={'submit'} disabled={isSubmitting}>
                Dalej
              </Button>
            </FlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default MainClientPage;
