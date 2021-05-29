import React from 'react';
import { Formik } from 'formik';

import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import { useFetch, useShowContent, useSubmit, useQuery } from 'components/hooks';
import { Button, DeletePopup, FormField, Spinner } from 'components';
import { fetchSingleEmployee, updateEmployee, UpdateEmployeeData } from 'api';
import { useAppDispatch } from 'store/store';
import { setNotification } from 'ducks/popup/popup';
import { EmployeeSchema } from 'validation/modelsValidation';

import { Paragraph, SpinnerWrapper } from 'styles';
import { DeleteIcon } from 'styles/iconStyles';
import { Wrapper, StyledForm, HeaderWrapper, Title, InputWrapper } from 'styles/contentStyles';

interface Props {
  isDeleteOpen: boolean;
  setDeleteOpen: (isOpen: boolean) => void;
}

const EmployeeInfo: React.FC<Props> = ({ isDeleteOpen, setDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { query } = useQuery();

  const employeeData = useFetch(fetchSingleEmployee(query.employee), {
    dependencies: [query.employee],
    conditions: !!query.employee
  });
  const { showContent, showLoader, showNoContent, showError } = useShowContent(employeeData);
  const { payload: employee, refresh } = employeeData;

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit(
    updateEmployee(query.employee)
  );
  onSubmitSuccess(async () => {
    dispatch(setNotification({ message: 'Zaktualizowano', type: 'success' }));
    await refresh();
  });
  onSubmitError(({ message }) => dispatch(setNotification({ message })));

  const initialValues: UpdateEmployeeData = {
    hourSalary: employee?.pricePerHour,
    monthlySalary: employee?.monthlyPrice
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
        <>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={EmployeeSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, isSubmitting }) => (
              <StyledForm>
                <Paragraph>W firmie od: {new Date(employee.userId.createdDate).toLocaleDateString()}</Paragraph>
                <HeaderWrapper>
                  <Title>
                    {employee.userId.name} {employee.userId.lastName}
                  </Title>
                  <DeleteIcon onClick={handleDeleteOpen} />
                </HeaderWrapper>
                <PersonalInfo employee={employee} />
                <InputWrapper>
                  <FormField name={'hourSalary'} type={'number'} label={'Stawka godzinowa'} required={false} spacing={true} />
                  <FormField name={'monthlySalary'} type={'number'} label={'Stawka miesięczna'} required={false} spacing={true} />
                </InputWrapper>
                <Button type={'submit'} disabled={(!values.hourSalary && !values.monthlySalary) || isSubmitting}>
                  Zapisz
                </Button>
              </StyledForm>
            )}
          </Formik>
          <DeletePopup
            isOpen={isDeleteOpen}
            setOpen={setDeleteOpen}
            headerText={'Usuń pracownika'}
            text={`${employee.userId.name} ${employee.userId.lastName}`}
          />
        </>
      )}
    </Wrapper>
  );
};

export default EmployeeInfo;
