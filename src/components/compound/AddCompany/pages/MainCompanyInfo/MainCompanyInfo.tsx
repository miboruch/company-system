import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import { Formik } from 'formik';
import { FlexWrapper, StyledLabel, MobileCompoundTitle } from '../../../../../styles/sharedStyles';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import Button from '../../../../atoms/Button/Button';
import { StyledForm, StyledInput, Wrapper, StyledCompoundTitle, MobileCompoundTitleNoneStandard } from './MainCompanyInfo.styles';

type defaultValues = {
  name: string;
  nip: string;
  email: string;
  phoneNumber: string;
};

interface Props {}

const MainCompanyInfo: React.FC<Props> = () => {
  const { data, setData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    name: data.name ? data.name : '',
    nip: data.nip ? data.nip : '',
    email: data.email ? data.email : '',
    phoneNumber: data.phoneNumber ? data.phoneNumber : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
    console.log(values);
    console.log('set to context');
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values }) => (
        <>
          <StyledCompoundTitle>Główne informacje o twojej firmie</StyledCompoundTitle>
          <Wrapper>
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
          </Wrapper>
        </>
      )}
    </Formik>
  );
};

export default MainCompanyInfo;
