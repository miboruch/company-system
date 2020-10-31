import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { FlexWrapper, StyledLabel } from '../../../../../styles/shared';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import Button from '../../../../atoms/Button/Button';
import { ClientDataContext } from '../../context/ClientDataContext';
import NumberFormat from 'react-number-format';

type defaultValues = {
  name: string;
  email: string;
  phoneNumber: string;
};

interface Props {}

const MainClientPage: React.FC<Props> = () => {
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>('');

  const initialValues: defaultValues = {
    name: data.name ? data.name : '',
    email: data.email ? data.email : '',
    phoneNumber: data.phoneNumber ? data.phoneNumber : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
    console.log(data);
    console.log('set to context');
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values, setFieldValue }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o kliencie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'text'} labelText={'Nazwa'} />
            <StyledInput onChange={handleChange} name={'email'} value={values.email} required={true} type={'email'} labelText={'Email'} />
            {/*<StyledInput onChange={handleChange} name={'phoneNumber'} value={values.phoneNumber} required={true} type={'text'} labelText={'Numer telefonu'} />*/}
            <div>
              <StyledLabel>Numer telefonu</StyledLabel>
              <NumberFormat
                onValueChange={({ formattedValue, value }) => {
                  setFieldValue('phoneNumber', value);
                  setFormattedPhoneNumber(formattedValue);
                }}
                name={'phoneNumber'}
                value={formattedPhoneNumber || values.phoneNumber}
                format={'### ### ###'}
                className={'phone-input'}
              />
            </div>
            <FlexWrapper>
              <Button type={'submit'} text={'Dalej'} />
            </FlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default MainClientPage;
