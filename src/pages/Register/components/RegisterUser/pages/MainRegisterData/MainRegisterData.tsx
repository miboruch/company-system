import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { RegisterDataContext } from '../../context/RegisterDataContext';
import { PageContext } from '../../context/PageContext';
import { MainRegisterDataSchema } from '../../validation/validation';
import { mainRegisterFields } from './main-register.fields';

import { StyledForm, Heading } from 'pages/Login/Login.styles';
import { FlexWrapper } from 'styles/shared';
import 'react-datepicker/dist/react-datepicker.css';

type defaultValues = {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date | undefined | null;
};

interface Props {
  isRegistrationLink: boolean;
}

const MainRegisterData: React.FC<Props> = () => {
  const { data, setData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    email: data?.email || '',
    name: data?.name || '',
    lastName: data?.lastName || '',
    dateOfBirth: data?.dateOfBirth || null
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(currentPage + 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={MainRegisterDataSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Heading>Wypełnij dane</Heading>
          {mainRegisterFields.map((field) => (
            <FormField key={field.name} {...field} spacing={true} />
          ))}
          <FlexWrapper>
            <Button type={'submit'} disabled={isSubmitting}>
              Dalej
            </Button>
          </FlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default MainRegisterData;
