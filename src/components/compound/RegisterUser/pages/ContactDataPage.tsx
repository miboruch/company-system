import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Formik } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Button from '../../../atoms/Button/Button';

import { useAppDispatch } from '../../../../store/store';
import { RegisterDataContext } from '../context/RegisterDataContext';
import { PageContext } from '../context/PageContext';
import { Heading, StyledForm } from '../../../../pages/LoginPage/LoginPage.styles';
import { Paragraph } from '../../../../styles/typography/typography';
import { DoubleFlexWrapper, StyledLabel } from '../../../../styles/shared';
import { register } from '../../../../ducks/auth/register/register-creators';
import { registerFromLink } from '../../../../ducks/auth/link-registration/link-registration-creators';
import { StyledInput } from '../../../../pages/LoginPage/LoginPage.styles';
import { ContactDataSchema } from '../validation/validation';

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

type ConnectedProps = Props & RouteComponentProps;

const ContactDataPage: React.FC<ConnectedProps> = ({ history, isRegistrationLink, token }) => {
  const dispatch = useAppDispatch();

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
      if (token && data.password && data.repeatedPassword && data.name && data.lastName && data.dateOfBirth) {
        const { password, repeatedPassword, name, lastName, dateOfBirth } = data;

        dispatch(
          registerFromLink({
            token,
            password,
            repeatedPassword,
            name,
            lastName,
            dateOfBirth,
            phoneNumber,
            country,
            city,
            address,
            callback: () => {
              history.push('/select');
              setData({});
            }
          })
        );
      }
    } else {
      if (data.email && data.password && data.repeatedPassword && data.name && data.lastName && data.dateOfBirth) {
        const { email, password, repeatedPassword, name, lastName, dateOfBirth } = data;
        dispatch(
          register({
            email,
            password,
            repeatedPassword,
            name,
            lastName,
            dateOfBirth,
            phoneNumber,
            country,
            city,
            address,
            callback: () => {
              history.push('/select');
              setData({});
            }
          })
        );
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ContactDataSchema} validateOnBlur={false} validateOnChange={false}>
      {({ handleChange, values, setFieldValue, errors }) => (
        <StyledForm>
          <Heading>Podaj informacje kontaktowe</Heading>
          <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={errors.address || 'Adres'} />
          <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={errors.city || 'Miasto'} />
          <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={errors.country || 'Państwo'} />
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
          <DoubleFlexWrapper>
            <Paragraph type={'back'} onClick={() => handlePageBack()}>
              Wstecz
            </Paragraph>
            <Button type={'submit'} text={'Dalej'} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default withRouter(ContactDataPage);
