import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useAppDispatch } from 'store/store';

import { Button, FormField } from 'components';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { AddressDataSchema } from '../../validation/validation';
import { createNewCompany } from 'ducks/company/companies/companies-creators';

import { DoubleFlexWrapper } from 'styles';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper, StyledBackParagraph } from 'styles/compoundStyles';

type defaultValues = {
  address: string;
  city: string;
  country: string;
};

const AddressInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, setData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    address: data.address ? data.address : '',
    city: data.city ? data.city : '',
    country: data.country ? data.country : ''
  };

  const handleSubmit = ({ address, city, country }: defaultValues): void => {
    setData({ ...data, address, city, country });
    if (data.name && data.nip && data.email && data.lat && data.long && data.phoneNumber) {
      dispatch(
        createNewCompany({
          name: data.name,
          nip: data.nip,
          email: data.email,
          lat: data.lat,
          long: data.long,
          phoneNumber: data.phoneNumber,
          address,
          city,
          country,
          callback: () => console.log('added')
        })
      );
    }
  };

  const handlePreviousPage = () => setCurrentPage(PageSettingEnum.Second);

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={AddressDataSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <FormField name={'address'} type={'text'} label={'Adres'} required={true} spacing={true} />
            <FormField name={'city'} type={'text'} label={'Miasto'} required={true} spacing={true} />
            <FormField name={'country'} type={'text'} label={'Państwo'} required={true} spacing={true} />

            <DoubleFlexWrapper>
              <StyledBackParagraph type={'back'} onClick={handlePreviousPage}>
                Wstecz
              </StyledBackParagraph>
              <Button type={'submit'} disabled={isSubmitting}>
                Dalej
              </Button>
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default AddressInfo;
