import React, { useContext } from 'react';
import { Formik } from 'formik';
import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/sharedStyles';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import Button from '../../../../atoms/Button/Button';
import { ClientDataContext } from '../../context/ClientDataContext';

type defaultValues = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
};

interface Props {}

const MainClientPage: React.FC<Props> = () => {
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    name: data.name ? data.name : '',
    address: data.address ? data.address : '',
    email: data.email ? data.email : '',
    phoneNumber: data.phoneNumber ? data.phoneNumber : '',
    city: data.city ? data.city : '',
    country: data.country ? data.country : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    // setCurrentPage(currentPage + 1);
    console.log(data);
    console.log('set to context');
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o kliencie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'text'} labelText={'Nazwa'} />
            <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={'Adres'} />
            <StyledInput onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={'Email'} />
            <StyledInput onChange={handleChange} name={'phoneNumber'} value={values.phoneNumber} required={true} type={'text'} labelText={'Numer telefonu'} />
            <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={'Miasto'} />
            <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={'Kraj'} />
            <DoubleFlexWrapper>
              <StyledBackParagraph onClick={() => setCurrentPage(PageSettingEnum.Second)}>Wstecz</StyledBackParagraph>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default MainClientPage;
