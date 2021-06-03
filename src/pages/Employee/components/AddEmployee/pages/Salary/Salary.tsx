import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField, notifications } from 'components';
import { useAppDispatch } from 'store/store';
import { useCall } from 'components/hooks';
import { sendRegistrationMail } from 'api';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { addNewEmployee } from 'ducks/employees/employees-data/employees-data-creators';
import { EmployeeSalarySchema } from '../../validation/validation';

import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';
import { DoubleFlexWrapper } from 'styles/shared';

type DefaultValues = {
  email?: string;
  pricePerHour: number;
  monthlyPrice: number;
};

const Salary: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, setData } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const { submit, onCallSuccess, onCallError } = useCall(sendRegistrationMail);
  onCallSuccess(() => notifications.success('Wysłano zaproszenie na adres e-mail'));
  onCallError(() => notifications.error('Błąd podczas wysyłania zaproszenia'));

  const initialValues: DefaultValues = {
    email: data.registerWithMail ? data.email : '',
    pricePerHour: data.pricePerHour || 0,
    monthlyPrice: data.monthlyPrice || 0
  };

  const handleSubmit = async ({ email, pricePerHour, monthlyPrice }: DefaultValues) => {
    setData({ ...data, email, pricePerHour, monthlyPrice });
    if (data.registerWithMail) {
      if (email) {
        //TODO: change company name to company id
        await submit({ email, pricePerHour, monthlyPrice, companyName: 'test' });
      }
    } else {
      data.userId && dispatch(addNewEmployee({ userId: data.userId, pricePerHour, monthlyPrice }));
    }
  };

  const handlePageBack = (): void => {
    setCurrentPage(PageSettingEnum.First);
    setData({ ...data, registerWithMail: false });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={EmployeeSalarySchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Informacje szczegółowe</MobileCompoundTitle>
              <Subheading>Uzupełnij informacje</Subheading>
            </HeadingWrapper>
            {data.registerWithMail && <FormField name={'email'} type={'email'} label={'Email'} required={true} />}
            <FormField name={'pricePerHour'} type={'number'} label={'Stawka godzinowa'} required={false} />
            <FormField name={'monthlyPrice'} type={'number'} label={'Stawka miesięczna'} required={false} />
            <DoubleFlexWrapper>
              <StyledBackParagraph type={'back'} onClick={handlePageBack}>
                Wstecz
              </StyledBackParagraph>
              <Button type={'submit'} disabled={isSubmitting}>
                Dodaj
              </Button>
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default Salary;
