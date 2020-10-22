import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import Button from '../../atoms/Button/Button';
import { StyledInput } from '../../../styles/compoundStyles';
import { Wrapper, StyledForm, HeaderWrapper, Paragraph, EmployeeInfoBox, SubParagraph, TextParagraph, Title, InputWrapper } from './EmployeeInfo.styles';

interface InitialValues {
  hourSalary?: number;
  monthlySalary?: number;
}

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const EmployeeInfo: React.FC<ConnectedProps> = ({ token, selectedEmployee }) => {
  const initialValues: InitialValues = {
    hourSalary: selectedEmployee?.pricePerHour,
    monthlySalary: 0
  };

  const handleSubmit = (values: InitialValues): void => {
    console.log('UPDATE EMPLOYEE');
    console.log(values);
  };

  return (
    <Wrapper>
      {!!selectedEmployee && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values }) => (
            <StyledForm>
              <Paragraph>W firmie od: {new Date(selectedEmployee.userId.createdDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>
                  {selectedEmployee.userId.name} {selectedEmployee.userId.lastName}
                </Title>
                <p>icon</p>
              </HeaderWrapper>
              <EmployeeInfoBox>
                <SubParagraph>Data urodzenia: {new Date(selectedEmployee.userId.dateOfBirth).toLocaleDateString()}</SubParagraph>
                <SubParagraph>{selectedEmployee.userId.email}</SubParagraph>
                <SubParagraph>{selectedEmployee.userId.phoneNumber}</SubParagraph>
              </EmployeeInfoBox>
              <TextParagraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto beatae cum distinctio doloribus expedita magni nobis officiis,
                provident quisquam repellat temporibus voluptates. Aliquam, eum, quasi. Eos nisi, sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
                animi culpa eum in ipsum maxime molestiae mollitia nemo perspiciatis, porro quam, quasi quos vitae. Blanditiis deleniti et illum inventore ipsum?
              </TextParagraph>
              <InputWrapper>
                <StyledInput
                  name={'hourSalary'}
                  type={'number'}
                  value={values.hourSalary}
                  onChange={handleChange}
                  required={false}
                  labelText={'Stawka godzinowa'}
                  disabled={!!values.monthlySalary}
                />
                <StyledInput
                  name={'monthlySalary'}
                  type={'number'}
                  value={values.monthlySalary}
                  onChange={handleChange}
                  required={false}
                  labelText={'Stawka miesięczna'}
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

interface LinkStateProps {
  token: string | null;
  selectedEmployee: EmployeeDataInterface | null;
}

const mapStateToProps = ({ authenticationReducer: { token }, employeeReducer: { selectedEmployee } }: AppState): LinkStateProps => {
  return { token, selectedEmployee };
};

export default connect(mapStateToProps)(EmployeeInfo);
