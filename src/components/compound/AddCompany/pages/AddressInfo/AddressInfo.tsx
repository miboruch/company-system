import React, { useContext } from 'react';
import { Formik } from 'formik';
import { MobileCompoundTitle, FlexWrapper } from '../../../../../styles/sharedStyles';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext } from '../../context/PageContext';
import Button from '../../../../atoms/Button/Button';
import { Wrapper, StyledInput, StyledForm } from './AddressInfo.styles';

type defaultValues = {
  address: string;
  city: string;
  country: string;
};

interface Props {}

const AddressInfo: React.FC<Props> = () => {
  const { data, setData } = useContext(CompanyDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

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
            <FlexWrapper>
              <Button type={'submit'} text={'Dalej'} />
            </FlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default AddressInfo;
