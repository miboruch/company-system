import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { clientMainValues } from './main-client.values';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ClientDataContext, MainClientData } from '../../context/ClientDataContext';
import { MainClientDataSchema } from '../../validation/validation';

import { FlexWrapper } from 'styles';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';

const MainClientPage: React.FC = () => {
  const { mainData, setMainData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues = clientMainValues(mainData);

  const handleSubmit = (values: MainClientData): void => {
    setMainData({ ...values });
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
