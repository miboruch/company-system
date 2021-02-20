import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { FormField, Button } from 'components';

import { useAppDispatch } from 'store/store';
import { RegisterDataContext } from '../../context/RegisterDataContext';
import { PageContext } from '../../context/PageContext';
import { Heading, StyledForm } from 'pages/Login/Login.styles';
import { Paragraph } from 'styles/typography/typography';
import { DoubleFlexWrapper } from 'styles/shared';
import { register } from 'ducks/auth/register/register-creators';
import { registerFromLink } from 'ducks/auth/link-registration/link-registration-creators';
import { ContactDataSchema } from '../../validation/validation';
import { contactFields } from './contact.fields';

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

const Contact: React.FC<Props> = ({ isRegistrationLink, token }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { data, setData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handlePageBack = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const initialValues: defaultValues = {
    address: data.address || '',
    city: data.city || '',
    country: data.country || '',
    phoneNumber: data.phoneNumber || ''
  };

  const handleSubmit = (values: defaultValues): void => {
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
            ...values,
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
            ...values,
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ContactDataSchema}>
      {({ isSubmitting }) => (
        <StyledForm>
          <Heading>Podaj informacje kontaktowe</Heading>
          {contactFields.map((field) => (
            <FormField key={field.name} {...field} spacing={true} />
          ))}
          <DoubleFlexWrapper>
            <Paragraph type={'back'} onClick={handlePageBack}>
              Wstecz
            </Paragraph>
            <Button type={'submit'} disabled={isSubmitting}>
              Dalej
            </Button>
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Contact;
