import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { StyledInput } from '../../../styles/compoundStyles';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
  flex-direction: column;

  ${({ theme }) => theme.mq.hdReady} {
    padding: 5rem;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  font-size: 12px;
  color: #D3D3D4;
  //color: ${({ theme }) => theme.colors.textGray};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 1rem;
  line-height: 2.2;
`;

const EmployeeInfoBox = styled.div`
  margin-bottom: 3rem;
`;

const SubParagraph = styled(Paragraph)`
  color: #78787f;
  margin: 0;
`;

const TextParagraph = styled(SubParagraph)`
  color: #454545;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  letter-spacing: -1px;
`;

const InputWrapper = styled.div`
  width: 50%;
  margin-top: 4rem;
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 5rem;
  right: 5rem;
`;

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
              <StyledButton type={'submit'} text={'Zapisz'} disabled={true} />
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
