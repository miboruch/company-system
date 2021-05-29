import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { FormField, Button } from 'components';
import { useSubmit } from 'components/hooks';
import { useAppDispatch } from 'store/store';
import { mainRegisterValues } from '../MainRegisterData/main-register.values';
import { passwordValues } from '../Password/password.values';
import { register } from 'api';
import { RegisterData } from 'types';
import { setNotification } from 'ducks/popup/popup';
import { RegisterDataContext } from '../../context/RegisterDataContext';
import { PageContext } from '../../context/PageContext';
import { ContactDataSchema } from '../../validation/validation';
import { contactFields } from './contact.fields';

import { Heading, StyledForm } from 'pages/Login/Login.styles';
import { Paragraph } from 'styles/typography/typography';
import { DoubleFlexWrapper } from 'styles/shared';

interface Props {
  isRegistrationLink: boolean;
  token?: string;
}

const Contact: React.FC<Props> = () => {
  //TODO: link register feature
  const history = useHistory();
  const dispatch = useAppDispatch();

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
  onSubmitSuccess(() => {
    history.push('/select');
    resetData();
    //TODO: dispatch get user data (headers etc.)
  });
  onSubmitError(() => dispatch(setNotification({ message: 'Błąd rejestracji' })));

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
