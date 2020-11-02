import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Input from '../../../atoms/Input/Input';
import { RegisterDataContext } from '../context/RegisterDataContext';
import { PageContext } from '../context/PageContext';
import { Formik } from 'formik';
import { Heading, StyledForm } from '../../../../pages/LoginPage/LoginPage.styles';
import { BackParagraph, DoubleFlexWrapper, StyledLabel } from '../../../../styles/shared';
import Button from '../../../atoms/Button/Button';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { registerFromLink, userRegister } from '../../../../actions/authenticationActions';

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

type defaultValues = {
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
};

interface Props {
  isRegistrationLink: boolean;
  token?: string;
}

type ConnectedProps = Props & LinkDispatchProps;

const ContactDataPage: React.FC<ConnectedProps> = ({ isRegistrationLink, token, registerFromLink, userRegister }) => {
  const { data, setData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string | null>(null);

  const handlePageBack = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const initialValues: defaultValues = {
    address: data.address || '',
    city: data.city || '',
    country: data.country || '',
    phoneNumber: data.phoneNumber || ''
  };

  const handleSubmit = ({ address, city, country, phoneNumber }: defaultValues): void => {
    if (isRegistrationLink) {
      console.log('register user from link');
      if (token && data.password && data.repeatedPassword && data.name && data.lastName && data.dateOfBirth) {
        registerFromLink(token, data.password, data.repeatedPassword, data.name, data.lastName, data.dateOfBirth, phoneNumber, country, city, address, () => console.log('created'));
      }
    } else {
      console.log('register user');
    }
    // setData({ ...data, ...values });
    // setCurrentPage(currentPage + 1);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values, setFieldValue }) => (
        <StyledForm>
          <Heading>Podaj informacje kontaktowe</Heading>
          <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={'Adres'} />
          <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={'Miasto'} />
          <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={'Państwo'} />
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
          <DoubleFlexWrapper>
            <BackParagraph onClick={() => handlePageBack()}>Wstecz</BackParagraph>
            <Button type={'submit'} text={'Dalej'} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

interface LinkDispatchProps {
  userRegister: (
    email: string,
    password: string,
    repeatedPassword: string,
    name: string,
    lastName: string,
    dateOfBirth: Date,
    phoneNumber: string,
    country: string,
    city: string,
    address: string,
    callback: () => void
  ) => void;
  registerFromLink: (
    token: string,
    password: string,
    repeatedPassword: string,
    name: string,
    lastName: string,
    dateOfBirth: Date,
    phoneNumber: string,
    country: string,
    city: string,
    address: string,
    callback: () => void
  ) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userRegister: bindActionCreators(userRegister, dispatch),
    registerFromLink: bindActionCreators(registerFromLink, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ContactDataPage);
