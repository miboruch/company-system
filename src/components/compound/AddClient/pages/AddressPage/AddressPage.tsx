import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { ClientDataContext } from '../../context/ClientDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { addNewClient } from 'ducks/client/client-creators';
import { AddressDataSchema } from '../../validation/validation';

import { Paragraph, DoubleFlexWrapper } from 'styles';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';

type defaultValues = {
  address: string;
  city: string;
  country: string;
};

const AddressPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    address: data?.address || '',
    city: data?.city || '',
    country: data?.country || ''
  };

  const handleSubmit = ({ address, city, country }: defaultValues): void => {
    setData({ ...data, address, city, country });
    if (data.name && data.email && data.phoneNumber && data.lat && data.long) {
      dispatch(
        addNewClient({
          name: data.name,
          address,
          email: data.email,
          phoneNumber: data.phoneNumber,
          city,
          country,
          lat: data.lat,
          long: data.long
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
              <MobileCompoundTitle>Informacje adresowe</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <FormField name={'address'} type={'text'} label={'Adres'} required={true} spacing={true} />
            <FormField name={'city'} type={'text'} label={'Miasto'} required={true} spacing={true} />
            <FormField name={'country'} type={'text'} label={'Państwo'} required={true} spacing={true} />
            <DoubleFlexWrapper>
              <Paragraph type={'back'} onClick={handlePreviousPage}>
                Wstecz
              </Paragraph>
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

export default AddressPage;
