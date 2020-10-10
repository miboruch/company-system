import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const StyledForm = styled(Form)`
  width: 100%;
  padding: 2rem 3rem;
`;

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #212121;
  margin-bottom: 6rem;
  letter-spacing: -1px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 3rem;
`;

interface Props {}
interface InitialValues {
  email: string;
  password: string;
}

const LoginPage: React.FC<Props> = () => {
  const initialValues: InitialValues = {
    email: '',
    password: ''
  };

  return (
    <StyledWrapper>
      <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
        {({ handleChange, values }) => (
          <StyledForm>
            <Heading>Panel pracownika firmy</Heading>
            <StyledInput onChange={handleChange} type={'email'} name={'email'} value={values.email} required={true} labelText={'Email'} />
            <Input onChange={handleChange} type={'password'} name={'password'} value={values.password} required={true} labelText={'Hasło'} />
            <FlexWrapper>
              <Button type={'submit'} text={'Zaloguj'} />
            </FlexWrapper>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

export default LoginPage;
