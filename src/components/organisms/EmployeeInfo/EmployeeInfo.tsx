import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import Button from '../../atoms/Button/Button';

import { AppState, useAppDispatch } from '../../../store/store';
import { StyledInput } from '../../../styles/compoundStyles';
import { Paragraph } from '../../../styles/typography/typography';
import { Wrapper, StyledForm, HeaderWrapper, EmployeeInfoBox, Title, InputWrapper } from '../../../styles/contentStyles';
import { updateEmployeeSalary } from '../../../ducks/employees/employees-data/employees-data-creators';
import { DeleteIcon } from '../../../styles/iconStyles';
import { EmployeeSchema } from '../../../validation/modelsValidation';

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

  return (
    <Wrapper>
      {!!selectedEmployee && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={EmployeeSchema} validateOnChange={false} validateOnBlur={false}>
          {({ handleChange, values, errors }) => (
            <StyledForm>
              <Paragraph>W firmie od: {new Date(selectedEmployee.userId.createdDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>
                  {selectedEmployee.userId.name} {selectedEmployee.userId.lastName}
                </Title>
                <DeleteIcon onClick={() => setDeleteOpen(true)} />
              </HeaderWrapper>
              <EmployeeInfoBox>
                <Paragraph type={'subparagraph'}>Data urodzenia: {new Date(selectedEmployee.userId.dateOfBirth).toLocaleDateString()}</Paragraph>
                <Paragraph type={'subparagraph'}>{selectedEmployee.userId.email}</Paragraph>
                <Paragraph type={'subparagraph'}>{selectedEmployee.userId.phoneNumber}</Paragraph>
              </EmployeeInfoBox>
              <Paragraph type={'text'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto beatae cum distinctio doloribus expedita magni nobis officiis, provident quisquam repellat
                temporibus voluptates. Aliquam, eum, quasi. Eos nisi, sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi culpa eum in ipsum maxime molestiae mollitia nemo
                perspiciatis, porro quam, quasi quos vitae. Blanditiis deleniti et illum inventore ipsum?
              </Paragraph>
              <InputWrapper>
                <StyledInput
                  name={'hourSalary'}
                  type={'number'}
                  value={values.hourSalary}
                  onChange={handleChange}
                  required={false}
                  labelText={errors.hourSalary || 'Stawka godzinowa'}
                  disabled={!!values.monthlySalary}
                />
                <StyledInput
                  name={'monthlySalary'}
                  type={'number'}
                  value={values.monthlySalary}
                  onChange={handleChange}
                  required={false}
                  labelText={errors.monthlySalary || 'Stawka miesięczna'}
                  disabled={!!values.hourSalary}
                />
              </InputWrapper>
              <Button type={'submit'} text={'Zapisz'} disabled={!values.hourSalary && !values.monthlySalary} />
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default EmployeeInfo;
