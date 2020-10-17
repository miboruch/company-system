import React, { useContext } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Formik, Form } from 'formik';
import Input from '../../../atoms/Input/Input';
import { MobileCompoundTitle, StyledLabel, FlexWrapper } from '../../../../styles/sharedStyles';
import { CompanyDataContext } from '../context/CompanyDataContext';
import { PageContext } from '../context/PageContext';
import Button from '../../../atoms/Button/Button';

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  padding: 0 2rem;
`;

type defaultValues = {
  name: string;
  nip: string;
  email: string;
  phoneNumber: string;
};

interface Props {}

const MainCompanyInfo: React.FC<Props> = () => {
  const { data, setData } = useContext(CompanyDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    name: data.name ? data.name : '',
    nip: data.nip ? data.nip : '',
    email: data.email ? data.email : '',
    phoneNumber: data.phoneNumber ? data.phoneNumber : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(currentPage + 1);
    console.log(values);
    console.log('set to context');
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values }) => (
        <StyledForm>
          <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
          <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'text'} labelText={'Naza firmy'} />
          <StyledInput onChange={handleChange} name={'nip'} value={values.nip} required={true} type={'text'} labelText={'NIP'} />
          <StyledInput onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={'Email'} />
          <div>
            <StyledLabel>Numer telefonu</StyledLabel>
            <NumberFormat
              onValueChange={(values) => console.log(values)}
              name={'phoneNumber'}
              value={values.phoneNumber}
              format={'### ### ###'}
              className={'phone-input'}
            />
          </div>
          <FlexWrapper>
            <Button type={'submit'} text={'Dalej'} />
          </FlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default MainCompanyInfo;
