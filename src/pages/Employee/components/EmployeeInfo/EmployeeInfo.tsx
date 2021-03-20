import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { Button, FormField, Spinner } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { Wrapper, StyledForm, HeaderWrapper, EmployeeInfoBox, Title, InputWrapper } from 'styles/contentStyles';
import { updateEmployeeSalary } from 'ducks/employees/employees-data/employees-data-creators';
import { EmployeeSchema } from 'validation/modelsValidation';

import { Paragraph } from 'styles';
import { DeleteIcon } from 'styles/iconStyles';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { fetchSingleEmployee } from 'api';
import { SpinnerWrapper } from 'styles';

interface InitialValues {
  hourSalary?: number;
  monthlySalary?: number;
}

interface Props {
  setDeleteOpen: (isOpen: boolean) => void;
}

const EmployeeInfo: React.FC<Props> = ({ setDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { query } = useQuery();

  const employeeData = useFetch<typeof fetchSingleEmployee>(fetchSingleEmployee(query.employee), {
    dependencies: [query.employee]
  });
  const { showContent, showLoader, showNoContent, showError } = useShowContent(employeeData);
  const { payload: employee } = employeeData;

  const initialValues: InitialValues = {
    hourSalary: employee?.pricePerHour,
    monthlySalary: employee?.monthlyPrice
  };

  const handleSubmit = ({ hourSalary, monthlySalary }: InitialValues): void => {
    dispatch(updateEmployeeSalary({ pricePerHour: hourSalary, monthlyPrice: monthlySalary }));
  };

  const handleDeleteOpen = () => setDeleteOpen(true);

  return (
    <Wrapper>
      {showLoader && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Problem z załadowaniem danych</Paragraph>}
      {showContent && employee && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={EmployeeSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values }) => (
            <StyledForm>
              <Paragraph>W firmie od: {new Date(employee.userId.createdDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>
                  {employee.userId.name} {employee.userId.lastName}
                </Title>
                <DeleteIcon onClick={handleDeleteOpen} />
              </HeaderWrapper>
              <EmployeeInfoBox>
                <Paragraph type={'subparagraph'}>
                  Data urodzenia: {new Date(employee.userId.dateOfBirth).toLocaleDateString()}
                </Paragraph>
                <Paragraph type={'subparagraph'}>{employee.userId.email}</Paragraph>
                <Paragraph type={'subparagraph'}>{employee.userId.phoneNumber}</Paragraph>
              </EmployeeInfoBox>
              <Paragraph type={'text'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto beatae cum distinctio
                doloribus expedita magni nobis officiis, provident quisquam repellat temporibus voluptates. Aliquam, eum, quasi.
                Eos nisi, sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi culpa eum in ipsum maxime
                molestiae mollitia nemo perspiciatis, porro quam, quasi quos vitae. Blanditiis deleniti et illum inventore ipsum?
              </Paragraph>
              <InputWrapper>
                <FormField name={'hourSalary'} type={'number'} label={'Stawka godzinowa'} required={false} />
                <FormField name={'monthlySalary'} type={'number'} label={'Stawka miesięczna'} required={false} />
              </InputWrapper>
              <Button type={'submit'} disabled={!values.hourSalary && !values.monthlySalary}>
                Zapisz
              </Button>
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default EmployeeInfo;
