import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { mainCompanyValues } from './main-company.values';
import { CompanyDataContext, MainCompanyData } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { MainCompanyDataSchema } from '../../validation/validation';
import { mainCompanyInfoFields } from './main-company-info.fields';

import { FlexWrapper } from 'styles';
import { Wrapper, StyledForm, MobileCompoundTitle, Subheading, HeadingWrapper } from 'styles/compoundStyles';

const MainCompanyInfo: React.FC = () => {
  const { mainData, setMainData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues = mainCompanyValues(mainData);

  const handleSubmit = (values: MainCompanyData): void => {
    setMainData({ ...values });
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
