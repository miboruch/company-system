import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '../../../atoms/Button/Button';
import { RegisterDataContext } from '../context/RegisterDataContext';
import { PageContext } from '../context/PageContext';
import { Heading, StyledForm } from '../../../../pages/LoginPage/LoginPage.styles';
import { Paragraph } from '../../../../styles/typography/typography';
import { DoubleFlexWrapper, StyledLabel } from '../../../../styles/shared';
import { registerFromLink, userRegister } from '../../../../actions/authenticationActions';
import { StyledInput } from '../../../../pages/LoginPage/LoginPage.styles';

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
  const dispatch = useDispatch();

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
        dispatch(
          registerFromLink(token, data.password, data.repeatedPassword, data.name, data.lastName, data.dateOfBirth, phoneNumber, country, city, address, () => {
            history.push('/select');
            setData({});
          })
        );
      }
    } else {
      if (data.email && data.password && data.repeatedPassword && data.name && data.lastName && data.dateOfBirth) {
        dispatch(
          userRegister(data.email, data.password, data.repeatedPassword, data.name, data.lastName, data.dateOfBirth, phoneNumber, country, city, address, () => {
            history.push('/select');
            setData({});
          })
        );
      }
    }
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
