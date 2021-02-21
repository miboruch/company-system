import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { MainCompanyDataSchema } from '../../validation/validation';
import { mainCompanyInfoFields } from './main-company-info.fields';

import { FlexWrapper } from 'styles';
import { Wrapper, StyledForm, MobileCompoundTitle, Subheading, HeadingWrapper } from 'styles/compoundStyles';

type defaultValues = {
  name: string;
  nip: string;
  email: string;
  phoneNumber: string;
};

const MainCompanyInfo: React.FC = () => {
  const { data, setData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    name: data.name ? data.name : '',
    nip: data.nip ? data.nip : '',
    email: data.email ? data.email : '',
    phoneNumber: data.phoneNumber ? data.phoneNumber : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={MainCompanyDataSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            {mainCompanyInfoFields.map((field) => (
              <FormField key={field.name} {...field} />
            ))}
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

export default MainCompanyInfo;
