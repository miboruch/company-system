import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { FormField, Button } from 'components';

import { useAppDispatch } from 'store/store';
import { mainRegisterValues } from '../MainRegisterData/main-register.values';
import { passwordValues } from '../Password/password.values';
import { MainRegisterInterface, PasswordData, RegisterDataContext } from '../../context/RegisterDataContext';
import { PageContext } from '../../context/PageContext';
import { Heading, StyledForm } from 'pages/Login/Login.styles';
import { Paragraph } from 'styles/typography/typography';
import { DoubleFlexWrapper } from 'styles/shared';
import { register, RegisterInterface } from 'api';
import { setNotification } from 'ducks/popup/popup';
import { useSubmit } from 'components/hooks';
import { registerFromLink } from 'ducks/auth/link-registration/link-registration-creators';
import { ContactDataSchema } from '../../validation/validation';
import { contactFields } from './contact.fields';

type CompoundRegisterInterface = MainRegisterInterface & PasswordData;

interface DefaultValues extends CompoundRegisterInterface {
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

interface Props {
  isRegistrationLink: boolean;
  token?: string;
}

const Contact: React.FC<Props> = ({ isRegistrationLink, token }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { mainData, passwordData, resetData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handlePageBack = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const initialValues: DefaultValues = {
    ...mainRegisterValues(mainData),
    ...passwordValues(passwordData),
    address: '',
    city: '',
    country: '',
    phoneNumber: ''
  };

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit<typeof register, RegisterInterface>(register);
  onSubmitSuccess(() => {
    history.push('/select');
    resetData();
    //TODO: dispatch get user data (headers etc.)
  });
  onSubmitError(() => dispatch(setNotification({ message: 'Błąd rejestracji' })));

  // const handleSubmit = (values: DefaultValues): void => {
  //   if (isRegistrationLink) {
  //     if (token && passwordData && mainData) {
  //       const { name, lastName, dateOfBirth } = mainData;
  //       const { password, repeatedPassword } = passwordData;
  //
  //       dispatch(
  //         registerFromLink({
  //           token,
  //           password,
  //           repeatedPassword,
  //           name,
  //           lastName,
  //           dateOfBirth,
  //           ...values,
  //           callback: () => {
  //             history.push('/select');
  //             resetData();
  //           }
  //         })
  //       );
  //     }
  //   } else {
  //     if (mainData && passwordData) {
  //       const { email, name, lastName, dateOfBirth } = mainData;
  //       const { password, repeatedPassword } = passwordData;
  //
  //       // dispatch(
  //       //   register({
  //       //     email,
  //       //     password,
  //       //     repeatedPassword,
  //       //     name,
  //       //     lastName,
  //       //     dateOfBirth,
  //       //     ...values,
  //       //     callback: () => {
  //       //       history.push('/select');
  //       //       setData({});
  //       //     }
  //       //   })
  //       // );
  //     }
  //   }
  // };

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
