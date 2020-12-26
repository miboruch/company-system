import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import Button from 'components/atoms/Button/Button';

import { Paragraph } from 'styles/typography/typography';
import { DoubleFlexWrapper } from 'styles/shared';
import { ClientDataContext } from '../../context/ClientDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { addNewClient } from 'ducks/client/client-creators';
import { AddressDataSchema } from '../../validation/validation';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, StyledInput, Subheading, Wrapper } from 'styles/compoundStyles';

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
      dispatch(addNewClient({ name: data.name, address, email: data.email, phoneNumber: data.phoneNumber, city, country, lat: data.lat, long: data.long }));
    }
  };

  const handlePreviousPage = () => setCurrentPage(PageSettingEnum.Second);

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={AddressDataSchema} validateOnChange={false} validateOnBlur={false}>
      {({ handleChange, values, errors }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Informacje adresowe</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={errors.address || 'Adres'} />
            <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={errors.city || 'Miasto'} />
            <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={errors.country || 'Kraj'} />
            <DoubleFlexWrapper>
              <Paragraph type={'back'} onClick={handlePreviousPage}>
                Wstecz
              </Paragraph>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default AddressPage;
