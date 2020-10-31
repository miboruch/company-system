import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { StyledInput } from '../../../styles/compoundStyles';
import { Wrapper, StyledForm, HeaderWrapper, Paragraph, EmployeeInfoBox, SubParagraph, TextParagraph, Title, InputWrapper } from '../../../styles/contentStyles';
import { TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { StyledLabel } from '../../../styles/shared';
import DatePicker from 'react-datepicker';

interface InitialValues {
  name?: string;
  description?: string;
  timeEstimate?: number;
  clientId?: string | null;
  taskIncome?: number;
  taskExpense?: number;
  isCompleted?: boolean;
  date?: Date;
}

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const TaskInfo: React.FC<ConnectedProps> = ({ selectedTask }) => {
  const [isEditToggled, setEditToggled] = useState<boolean>(false);

  const initialValues: InitialValues = {
    name: selectedTask?.name,
    description: selectedTask?.description,
    timeEstimate: selectedTask?.timeEstimate,
    clientId: selectedTask?.clientId,
    taskIncome: selectedTask?.taskIncome,
    taskExpense: selectedTask?.taskExpense,
    isCompleted: selectedTask?.isCompleted,
    date: selectedTask?.date
  };

  const handleSubmit = (values: InitialValues) => {
    console.log(values);
  };

  return (
    <Wrapper>
      {!!selectedTask && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values, setFieldValue }) => (
            <StyledForm>
              <Paragraph>Data dodania: {new Date(selectedTask.addedDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>{selectedTask.name}</Title>
                <p>icon</p>
              </HeaderWrapper>
              <EmployeeInfoBox>
                <SubParagraph>Data zadania do wykonania: {new Date(selectedTask.date).toLocaleDateString()}</SubParagraph>
                <SubParagraph>{selectedTask.description}</SubParagraph>
                {/*<SubParagraph>{selectedEmployee.userId.phoneNumber}</SubParagraph>*/}
              </EmployeeInfoBox>
              <InputWrapper>
                <div>
                  <StyledLabel>Data wykonania zadania</StyledLabel>
                  <DatePicker selected={values.date && new Date(values.date)} onChange={(date) => setFieldValue('date', date)} disabled={true} />
                </div>
              </InputWrapper>
              <TextParagraph>Jeżeli chcesz edytować zadanie, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie wszystkich pól oraz edycję danych.</TextParagraph>
              <InputWrapper>
                <StyledInput onChange={handleChange} name={'name'} required={true} type={'text'} labelText={'Nazwa'} value={values.name} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'description'} required={true} type={'text'} labelText={'Opis'} value={values.description} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'timeEstimate'} required={true} type={'number'} labelText={'Szacowany czas'} value={values.timeEstimate} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'taskIncome'} type={'number'} required={false} labelText={'Przychód z zadania'} value={values.taskIncome} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'taskExpense'} type={'number'} required={false} labelText={'Wydatek z zadania'} value={values.taskExpense} disabled={!isEditToggled} />
              </InputWrapper>
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

interface LinkStateProps {
  selectedTask: TaskInterface | null;
}

const mapStateToProps = ({ taskReducer: { selectedTask } }: AppState): LinkStateProps => {
  return { selectedTask };
};

export default connect(mapStateToProps)(TaskInfo);
