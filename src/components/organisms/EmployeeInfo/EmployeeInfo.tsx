import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { StyledInput, StyledForm } from '../../../styles/compoundStyles';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;
`;

interface InitialValues {
  hourSalary?: number;
  monthlySalary?: number;
}

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const EmployeeInfo: React.FC<ConnectedProps> = ({ token, selectedEmployee }) => {
  const initialValues: InitialValues = {
    hourSalary: 0,
    monthlySalary: 0
  };

  const handleSubmit = (values: InitialValues): void => {
    console.log('UPDATE EMPLOYEE');
    console.log(values);
  };

  return (
    <Wrapper>
      {!!selectedEmployee && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, values }) => (
            <StyledForm>
              <p>Imię: {selectedEmployee.userId.name}</p>
              <p>Nazwisko: {selectedEmployee.userId.lastName}</p>
              <StyledInput name={'hourSalary'} type={'number'} value={values.hourSalary} onChange={handleChange} required={false} labelText={'Stawka godzinowa'} />
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

interface LinkStateProps {
  token: string | null;
  selectedEmployee: EmployeeDataInterface | null;
}

const mapStateToProps = ({ authenticationReducer: { token }, employeeReducer: { selectedEmployee } }: AppState): LinkStateProps => {
  return { token, selectedEmployee };
};

export default connect(mapStateToProps)(EmployeeInfo);
