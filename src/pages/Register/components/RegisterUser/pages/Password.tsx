import React, { useContext } from 'react';
import { RegisterDataContext } from '../context/RegisterDataContext';
import { Formik } from 'formik';

import Button from 'components/atoms/Button/Button';

import { PageContext } from '../context/PageContext';
import { Heading, StyledForm } from 'pages/Login/Login.styles';
import { ErrorParagraph } from 'styles/typography/typography';
import { Paragraph } from 'styles/typography/typography';
import { DoubleFlexWrapper } from 'styles/shared';
import { StyledInput } from 'pages/Login/Login.styles';
import { PasswordSchema } from '../validation/validation';

type defaultValues = {
  password: string;
  repeatedPassword: string;
};

const Password: React.FC = () => {
  const { data, setData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handlePageBack = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const initialValues: defaultValues = {
    password: data.password || '',
    repeatedPassword: data.repeatedPassword || ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(currentPage + 1);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PasswordSchema} validateOnChange={false} validateOnBlur={false}>
      {({ handleChange, values, errors }) => (
        <StyledForm>
          <Heading>Podaj hasło</Heading>
          <StyledInput onChange={handleChange} name={'password'} value={values.password} required={true} type={'password'} labelText={errors.password || 'Hasło'} />
          <StyledInput onChange={handleChange} name={'repeatedPassword'} value={values.repeatedPassword} required={true} type={'password'} labelText={errors.repeatedPassword || 'Powtórz hasło'} />
          <DoubleFlexWrapper>
            <Paragraph type={'back'} onClick={handlePageBack}>
              Wstecz
            </Paragraph>
            <Button type={'submit'} text={'Dalej'} disabled={values.password !== values.repeatedPassword} />
          </DoubleFlexWrapper>
          <ErrorParagraph isVisible={values.repeatedPassword ? values.password !== values.repeatedPassword : false}>Hasła muszą być takie same</ErrorParagraph>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Password;
