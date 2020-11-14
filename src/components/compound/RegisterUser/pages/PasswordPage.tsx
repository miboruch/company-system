import React, { useContext } from 'react';
import styled from 'styled-components';
import Input from '../../../atoms/Input/Input';
import { RegisterDataContext } from '../context/RegisterDataContext';
import { Formik } from 'formik';
import { PageContext } from '../context/PageContext';
import { Heading, StyledForm } from '../../../../pages/LoginPage/LoginPage.styles';
import Button from '../../../atoms/Button/Button';
import { ErrorParagraph } from '../../../../styles/typography/typography';
import { Paragraph } from '../../../../styles/typography/typography';
import { DoubleFlexWrapper } from '../../../../styles/shared';

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

type defaultValues = {
  password: string;
  repeatedPassword: string;
};

const PasswordPage: React.FC = () => {
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values }) => (
        <StyledForm>
          <Heading>Podaj hasło</Heading>
          <StyledInput onChange={handleChange} name={'password'} value={values.password} required={true} type={'password'} labelText={'Hasło'} />
          <StyledInput onChange={handleChange} name={'repeatedPassword'} value={values.repeatedPassword} required={true} type={'password'} labelText={'Powtórz hasło'} />
          <DoubleFlexWrapper>
            <Paragraph type={'back'} onClick={() => handlePageBack()}>
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

export default PasswordPage;
