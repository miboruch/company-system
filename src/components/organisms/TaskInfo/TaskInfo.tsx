import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { StyledInput } from '../../../styles/compoundStyles';
import { Wrapper, StyledForm, HeaderWrapper, Paragraph, EmployeeInfoBox, SubParagraph, TextParagraph, Title, InputWrapper, ButtonWrapper, RowIconWrapper } from '../../../styles/contentStyles';
import { ClientInterface, TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { StyledLabel } from '../../../styles/shared';
import DatePicker from 'react-datepicker';
import Button from '../../atoms/Button/Button';
import { DeleteIcon, EditIcon, CheckedIcon, NotCheckedIcon } from '../../../styles/iconStyles';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { changeTaskState, editTask } from '../../../actions/taskActions';
import MapCoordsEdit, { CoordsEditType } from '../MapCoordsEdit/MapCoordsEdit';
import { setTaskMapPreviewOpen } from '../../../actions/toggleActions';

interface ParagraphInterface {
  isCompleted: boolean;
}

const ColoredParagraph = styled.p<ParagraphInterface>`
  font-size: 12px;
  color: ${({ theme, isCompleted }) => (isCompleted ? theme.colors.red : theme.colors.green)};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 1rem;
  line-height: 2.2;
  cursor: pointer;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const StyledParagraph = styled(Paragraph)`
  cursor: pointer;
`;

interface InitialValues {
  name: string;
  description: string;
  timeEstimate: number;
  clientId?: ClientInterface | null;
  taskIncome: number;
  taskExpense: number;
  isCompleted: boolean;
  date: Date;
}

interface Props {
  isEditToggled: boolean;
  setEditToggled: (toBeOpen: boolean) => void;
  setDeleteOpen: (toBeOpen: boolean) => void;
}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const TaskInfo: React.FC<ConnectedProps> = ({ selectedTask, isEditToggled, setEditToggled, setDeleteOpen, editTask, changeTaskState, setTaskMapPreviewOpen }) => {
  const [isMapPreviewOpen, setMapPreviewOpen] = useState<boolean>(false);

  const initialValues: InitialValues = {
    name: selectedTask?.name || '',
    description: selectedTask?.description || '',
    timeEstimate: selectedTask?.timeEstimate || 0,
    clientId: selectedTask?.clientId,
    taskIncome: selectedTask?.taskIncome ? selectedTask.taskIncome : 0,
    taskExpense: selectedTask?.taskExpense ? selectedTask.taskExpense : 0,
    isCompleted: selectedTask?.isCompleted || false,
    date: selectedTask?.date || new Date()
  };

  const handleSubmit = ({ date, name, description, timeEstimate, taskIncome, taskExpense }: InitialValues) => {
    if (selectedTask) {
      const { _id } = selectedTask;
      editTask(_id, date, name, description, timeEstimate, taskIncome ? taskIncome : 0, taskExpense ? taskExpense : 0);
    }
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
                <RowIconWrapper>
                  {selectedTask?.isCompleted ? <CheckedIcon /> : <NotCheckedIcon />}
                  <EditIcon onClick={() => setEditToggled(!isEditToggled)} />
                  <DeleteIcon onClick={() => setDeleteOpen(true)} />
                </RowIconWrapper>
              </HeaderWrapper>
              <EmployeeInfoBox>
                <RowWrapper>
                  <SubParagraph>Data zadania do wykonania: {new Date(selectedTask.date).toLocaleDateString()}</SubParagraph>
                  {!!selectedTask.clientId && <StyledParagraph onClick={() => setTaskMapPreviewOpen(true)}>Zobacz na mapieeee</StyledParagraph>}
                </RowWrapper>
                <SubParagraph>{selectedTask.description}</SubParagraph>
                <ColoredParagraph isCompleted={selectedTask?.isCompleted} onClick={() => changeTaskState(selectedTask?._id, !selectedTask?.isCompleted)}>
                  Oznacz jako {selectedTask?.isCompleted ? 'niewykonane' : 'wykonane'}
                </ColoredParagraph>
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
              <ButtonWrapper>
                <Button type={'submit'} text={'Zapisz'} />
              </ButtonWrapper>
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

interface LinkDispatchProps {
  editTask: (taskId: string, date: Date, name: string, description: string, timeEstimate: number, taskIncome: number, taskExpense: number) => void;
  changeTaskState: (taskId: string, isCompleted: boolean) => void;
  setTaskMapPreviewOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ taskReducer: { selectedTask } }: AppState): LinkStateProps => {
  return { selectedTask };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    editTask: bindActionCreators(editTask, dispatch),
    changeTaskState: bindActionCreators(changeTaskState, dispatch),
    setTaskMapPreviewOpen: bindActionCreators(setTaskMapPreviewOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
