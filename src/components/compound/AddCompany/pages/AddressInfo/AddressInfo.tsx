import React, { useContext } from 'react';
import { Formik } from 'formik';
import Button from '../../../../atoms/Button/Button';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, StyledInput, Subheading, Wrapper, StyledBackParagraph } from '../../../../../styles/compoundStyles';
import { AddressDataSchema } from '../../validation/validation';
import { createNewCompany } from '../../../../../ducks/company/companies/companies-creators';
import { useAppDispatch } from '../../../../../store/test-store';

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
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={AddressDataSchema} validateOnChange={false} validateOnBlur={false}>
      {({ handleChange, values, errors }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={errors.address || 'Adres'} />
            <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={errors.city || 'Miasto'} />
            <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={errors.country || 'Kraj'} />
            <DoubleFlexWrapper>
              <StyledBackParagraph type={'back'} onClick={() => setCurrentPage(PageSettingEnum.Second)}>
                Wstecz
              </StyledBackParagraph>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default AddressInfo;
