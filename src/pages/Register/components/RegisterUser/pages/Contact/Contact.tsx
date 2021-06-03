import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { FormField, Button, notifications } from 'components';
import { useSubmit, useUser } from 'components/hooks';
import { mainRegisterValues } from '../MainRegisterData/main-register.values';
import { passwordValues } from '../Password/password.values';
import { setTokens } from 'ducks/auth/tokens/tokens';
import { useAppDispatch } from 'store/store';
import { register } from 'api';
import { RegisterData } from 'types';
import { RegisterDataContext } from '../../context/RegisterDataContext';
import { PageContext } from '../../context/PageContext';
import { ContactDataSchema } from '../../validation/validation';
import { contactFields } from './contact.fields';

import { Heading, StyledForm } from 'pages/Login/Login.styles';
import { DoubleFlexWrapper, Paragraph } from 'styles';

interface Props {
  isRegistrationLink: boolean;
  token?: string;
}

const Contact: React.FC<Props> = () => {
  //TODO: link register feature
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { setUser } = useUser();

  const { mainData, passwordData, resetData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handlePageBack = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const initialValues: RegisterData = {
    ...mainRegisterValues(mainData),
    ...passwordValues(passwordData),
    address: '',
    city: '',
    country: '',
    phoneNumber: ''
  };

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit(register);
  onSubmitSuccess((payload) => {
    const { token, refreshToken, user } = payload;
    history.push('/select');
    resetData();
    setUser(user);
    dispatch(setTokens({ token, refreshToken }));
  });
  onSubmitError(() => notifications.error('Błąd rejestracji'));

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ContactDataSchema}>
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
