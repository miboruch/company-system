import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { mainRegisterValues } from './main-register.values';
import { RegisterDataContext, MainRegisterInterface } from '../../context/RegisterDataContext';
import { PageContext } from '../../context/PageContext';
import { MainRegisterDataSchema } from '../../validation/validation';
import { mainRegisterFields } from './main-register.fields';

import { StyledForm, Heading } from 'pages/Login/Login.styles';
import { FlexWrapper } from 'styles/shared';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  isRegistrationLink: boolean;
}

const MainRegisterData: React.FC<Props> = () => {
  const { mainData, setMainData } = useContext(RegisterDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const registerMainValues = mainRegisterValues(mainData);

  const handleSubmit = (values: MainRegisterInterface): void => {
    setMainData({ ...values });
    setCurrentPage(currentPage + 1);
  };

  return (
    <Formik
      initialValues={registerMainValues}
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
