import React, { useState } from 'react';
import { Formik } from 'formik';
import { StyledInput } from '../../../styles/compoundStyles';
import NumberFormat from 'react-number-format';
import { DoubleFlexWrapper, StyledLabel } from '../../../styles/shared';
import DatePicker from 'react-datepicker';
import Button from '../../atoms/Button/Button';
import { StyledForm, Heading } from './AccountSettings.styles';
import { editAccount } from '../../../ducks/auth/account/account-creators';
import { AccountSchema } from '../../../validation/modelsValidation';
import { UserAuthData } from '../../../types/modelsTypes';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';

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
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: AppState) => state.auth.data);
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
    dispatch(editAccount({ email, name, lastName, dateOfBirth, phoneNumber, address, city, country }));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={AccountSchema} validateOnChange={false} validateOnBlur={false}>
      {({ handleChange, values, setFieldValue, errors }) => (
        <StyledForm>
          <Heading>Ustawienia konta</Heading>
          <StyledInput type={'email'} name={'email'} onChange={handleChange} value={values.email} required={true} labelText={errors.email || 'Email'} />
          <StyledInput type={'text'} name={'name'} onChange={handleChange} value={values.name} required={true} labelText={errors.name || 'Imię'} />
          <StyledInput type={'text'} name={'lastName'} onChange={handleChange} value={values.lastName} required={true} labelText={errors.lastName || 'Nazwisko'} />
          <div>
            <StyledLabel>{errors.dateOfBirth || 'Data urodzenia'}</StyledLabel>
            <DatePicker selected={values.dateOfBirth} onChange={(date) => setFieldValue('dateOfBirth', date)} dateFormat={'dd/MM/yyyy'} />
          </div>
          <div>
            <StyledLabel>{errors.phoneNumber || 'Numer telefonu'}</StyledLabel>
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
          <StyledInput type={'text'} name={'address'} onChange={handleChange} value={values.address} required={true} labelText={errors.address || 'Adres'} />
          <StyledInput type={'text'} name={'city'} onChange={handleChange} value={values.city} required={true} labelText={errors.city || 'Miasto'} />
          <StyledInput type={'text'} name={'country'} onChange={handleChange} value={values.country} required={true} labelText={errors.country || 'Kraj'} />
          <DoubleFlexWrapper>
            <Button type={'submit'} text={'Zapisz'} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default AccountSettings;
