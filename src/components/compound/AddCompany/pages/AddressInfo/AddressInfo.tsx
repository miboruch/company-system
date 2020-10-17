import React, { useContext } from 'react';
import { Formik } from 'formik';
import { BackParagraph, DoubleFlexWrapper, MobileCompoundTitle } from '../../../../../styles/sharedStyles';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import Button from '../../../../atoms/Button/Button';
import { StyledForm, StyledInput, Wrapper } from './AddressInfo.styles';

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
            <MobileCompoundTitle>Informacje o lokalizacji</MobileCompoundTitle>
            <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={'Adres'} />
            <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={'Miasto'} />
            <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={'Kraj'} />
            <DoubleFlexWrapper>
              <BackParagraph onClick={() => setCurrentPage(PageSettingEnum.Second)}>Wstecz</BackParagraph>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default AddressInfo;
