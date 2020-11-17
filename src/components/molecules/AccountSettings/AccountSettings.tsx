import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { StyledInput } from '../../../styles/compoundStyles';
import NumberFormat from 'react-number-format';
import { DoubleFlexWrapper, StyledLabel } from '../../../styles/shared';
import DatePicker from 'react-datepicker';
import Button from '../../atoms/Button/Button';
import { AppState } from '../../../reducers/rootReducer';
import { StyledForm, Heading } from './AccountSettings.styles';
import { editAccount } from '../../../actions/authenticationActions';

interface DefaultValues {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

const AccountSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: AppState) => state.authenticationReducer);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>('');

  const initialValues: DefaultValues = {
    email: userData?.email || '',
    name: userData?.name || '',
    lastName: userData?.lastName || '',
    dateOfBirth: new Date(userData?.dateOfBirth || ''),
    phoneNumber: userData?.phoneNumber || '',
    address: userData?.address || '',
    city: userData?.city || '',
    country: userData?.country || ''
  };

  const handleSubmit = ({ email, name, lastName, dateOfBirth, phoneNumber, address, city, country }: DefaultValues) => {
    dispatch(editAccount(email, name, lastName, dateOfBirth, phoneNumber, address, city, country));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
      {({ handleChange, handleBlur, values, setFieldValue }) => (
        <StyledForm>
          <Heading>Ustawienia konta</Heading>
          <StyledInput type={'email'} name={'email'} onChange={handleChange} value={values.email} required={true} labelText={'Email'} />
          <StyledInput type={'text'} name={'name'} onChange={handleChange} value={values.name} required={true} labelText={'Imię'} />
          <StyledInput type={'text'} name={'lastName'} onChange={handleChange} value={values.lastName} required={true} labelText={'Nazwisko'} />
          <div>
            <StyledLabel>Data urodzenia</StyledLabel>
            <DatePicker selected={values.dateOfBirth} onChange={(date) => setFieldValue('dateOfBirth', date)} dateFormat={'dd/MM/yyyy'} />
          </div>
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
          <StyledInput type={'text'} name={'address'} onChange={handleChange} value={values.address} required={true} labelText={'Adres'} />
          <StyledInput type={'text'} name={'city'} onChange={handleChange} value={values.city} required={true} labelText={'Miasto'} />
          <StyledInput type={'text'} name={'country'} onChange={handleChange} value={values.country} required={true} labelText={'Kraj'} />
          <DoubleFlexWrapper>
            <Button type={'submit'} text={'Zapisz'} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default AccountSettings;
