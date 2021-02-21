import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { Button, FormField } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { Wrapper, StyledForm, HeaderWrapper, EmployeeInfoBox, Title, InputWrapper } from 'styles/contentStyles';
import { updateEmployeeSalary } from 'ducks/employees/employees-data/employees-data-creators';
import { EmployeeSchema } from 'validation/modelsValidation';

import { Paragraph } from 'styles';
import { DeleteIcon } from 'styles/iconStyles';

interface InitialValues {
  hourSalary?: number;
  monthlySalary?: number;
}

interface Props {
  setDeleteOpen: (isOpen: boolean) => void;
}

const EmployeeInfo: React.FC<Props> = ({ setDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { selectedEmployee } = useSelector((state: AppState) => state.employees.employeesToggle);

  const initialValues: InitialValues = {
    hourSalary: selectedEmployee?.pricePerHour,
    monthlySalary: selectedEmployee?.monthlyPrice
  };

  const handleSubmit = ({ hourSalary, monthlySalary }: InitialValues): void => {
    dispatch(updateEmployeeSalary({ pricePerHour: hourSalary, monthlyPrice: monthlySalary }));
  };

  const handleDeleteOpen = () => setDeleteOpen(true);

  return (
    <Wrapper>
      {!!selectedEmployee && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={EmployeeSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, values, errors }) => (
            <StyledForm>
              <Paragraph>W firmie od: {new Date(selectedEmployee.userId.createdDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>
                  {selectedEmployee.userId.name} {selectedEmployee.userId.lastName}
                </Title>
                <DeleteIcon onClick={handleDeleteOpen} />
              </HeaderWrapper>
              <EmployeeInfoBox>
                <Paragraph type={'subparagraph'}>
                  Data urodzenia: {new Date(selectedEmployee.userId.dateOfBirth).toLocaleDateString()}
                </Paragraph>
                <Paragraph type={'subparagraph'}>{selectedEmployee.userId.email}</Paragraph>
                <Paragraph type={'subparagraph'}>{selectedEmployee.userId.phoneNumber}</Paragraph>
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
