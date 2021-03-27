import React, { useContext } from 'react';
import { Formik } from 'formik';

import { FormField, Button } from 'components';
import { passwordValues } from './password.values';
import { PageContext } from '../../context/PageContext';
import { PasswordSchema } from '../../validation/validation';
import { RegisterDataContext, PasswordData } from '../../context/RegisterDataContext';

import { Heading, StyledForm } from 'pages/Login/Login.styles';
import { Paragraph, ErrorParagraph, DoubleFlexWrapper } from 'styles';

const Password: React.FC = () => {
  const { passwordData, setPasswordData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handlePageBack = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const initialValues = passwordValues(passwordData);

  const handleSubmit = (values: PasswordData): void => {
    setPasswordData({ ...values });
    setCurrentPage(currentPage + 1);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PasswordSchema}>
      {({ values, isSubmitting }) => (
        <StyledForm>
          <Heading>Podaj hasło</Heading>
          <FormField name={'password'} type={'password'} label={'Hasło'} required={true} spacing={true} />
          <FormField name={'repeatedPassword'} type={'password'} label={'Powtórz hasło'} required={true} spacing={true} />
          <DoubleFlexWrapper>
            <Paragraph type={'back'} onClick={handlePageBack}>
              Wstecz
            </Paragraph>
            <Button type={'submit'} disabled={values.password !== values.repeatedPassword || isSubmitting}>
              Dalej
            </Button>
          </DoubleFlexWrapper>
          <ErrorParagraph isVisible={values.repeatedPassword ? values.password !== values.repeatedPassword : false}>
            Hasła muszą być takie same
          </ErrorParagraph>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Password;
