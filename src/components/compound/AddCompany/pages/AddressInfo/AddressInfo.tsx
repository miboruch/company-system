import React, { useContext } from 'react';
import { Formik } from 'formik';
import Button from '../../../../atoms/Button/Button';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, StyledInput, Subheading, Wrapper, StyledBackParagraph } from '../../../../../styles/compoundStyles';

type defaultValues = {
  address: string;
  city: string;
  country: string;
};

interface Props {}

const AddressInfo: React.FC<Props> = () => {
  const { data, setData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    address: data.address ? data.address : '',
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
              <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={'Adres'} />
            <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={'Miasto'} />
            <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={'Kraj'} />
            <DoubleFlexWrapper>
              <StyledBackParagraph type={'back'} onClick={() => setCurrentPage(PageSettingEnum.Second)}>Wstecz</StyledBackParagraph>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default AddressInfo;
