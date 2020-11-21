import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik } from 'formik';
import { StyledInput } from '../../../styles/compoundStyles';
import { Paragraph } from '../../../styles/typography/typography';
import { ButtonWrapper, EmployeeInfoBox, HeaderWrapper, InputWrapper, RowIconWrapper, StyledForm, Title, Wrapper } from '../../../styles/contentStyles';
import { ClientInterface, TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { StyledLabel } from '../../../styles/shared';
import DatePicker from 'react-datepicker';
import Button from '../../atoms/Button/Button';
import { CheckedIcon, DeleteIcon, EditIcon, LocationIcon, NotCheckedIcon } from '../../../styles/iconStyles';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { changeTaskState, editTask } from '../../../actions/taskActions';
import { setTaskMapPreviewOpen } from '../../../actions/toggleActions';
import { TaskSchema } from '../../../validation/modelsValidation';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';

interface ParagraphInterface {
  isCompleted: boolean;
}

const ColoredParagraph = styled(Paragraph)<ParagraphInterface>`
  color: ${({ theme, isCompleted }) => (isCompleted ? theme.colors.red : theme.colors.green)};
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

const TaskInfo: React.FC<ConnectedProps> = ({ selectedTask, role, isEditToggled, setEditToggled, setDeleteOpen, editTask, changeTaskState, setTaskMapPreviewOpen }) => {
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={TaskSchema} validateOnBlur={false} validateOnChange={false}>
          {({ handleChange, values, setFieldValue, errors }) => (
            <StyledForm>
              <Paragraph>Data dodania: {new Date(selectedTask.addedDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>{selectedTask.name}</Title>
                <RowIconWrapper>
                  {selectedTask?.isCompleted ? <CheckedIcon /> : <NotCheckedIcon />}
                  <LocationIcon onClick={() => setTaskMapPreviewOpen(true)} />
                  {role === UserRole.Admin && (
                    <>
                      <EditIcon onClick={() => setEditToggled(!isEditToggled)} />
                      <DeleteIcon onClick={() => setDeleteOpen(true)} />
                    </>
                  )}
                </RowIconWrapper>
              </HeaderWrapper>
              <EmployeeInfoBox>
                <Paragraph type={'subparagraph'}>Data zadania do wykonania: {new Date(selectedTask.date).toLocaleDateString()}</Paragraph>
                <Paragraph type={'subparagraph'}>{selectedTask.description}</Paragraph>
                {role === UserRole.Admin && (
                  <ColoredParagraph isCompleted={selectedTask?.isCompleted} onClick={() => changeTaskState(selectedTask?._id, !selectedTask?.isCompleted)}>
                    Oznacz jako {selectedTask?.isCompleted ? 'niewykonane' : 'wykonane'}
                  </ColoredParagraph>
                )}
              </EmployeeInfoBox>
              <InputWrapper>
                <div>
                  <StyledLabel>{errors.date || 'Data wykonania zadania'}</StyledLabel>
                  <DatePicker selected={values.date && new Date(values.date)} onChange={(date) => setFieldValue('date', date)} disabled={true} />
                </div>
              </InputWrapper>
              <Paragraph type={'text'}>Jeżeli chcesz edytować zadanie, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie wszystkich pól oraz edycję danych.</Paragraph>
              <InputWrapper>
                <StyledInput onChange={handleChange} name={'name'} required={true} type={'text'} labelText={errors.name || 'Nazwa'} value={values.name} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'description'} required={true} type={'text'} labelText={errors.description || 'Opis'} value={values.description} disabled={!isEditToggled} />
                <StyledInput
                  onChange={handleChange}
                  name={'timeEstimate'}
                  required={true}
                  type={'number'}
                  labelText={errors.timeEstimate || 'Szacowany czas'}
                  value={values.timeEstimate}
                  disabled={!isEditToggled}
                />
                <StyledInput
                  onChange={handleChange}
                  name={'taskIncome'}
                  type={'number'}
                  required={false}
                  labelText={errors.taskIncome || 'Przychód z zadania'}
                  value={values.taskIncome}
                  disabled={!isEditToggled}
                />
                <StyledInput
                  onChange={handleChange}
                  name={'taskExpense'}
                  type={'number'}
                  required={false}
                  labelText={errors.taskExpense || 'Wydatek z zadania'}
                  value={values.taskExpense}
                  disabled={!isEditToggled}
                />
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
  role: UserRole;
  selectedTask: TaskInterface | null;
}

interface LinkDispatchProps {
  editTask: (taskId: string, date: Date, name: string, description: string, timeEstimate: number, taskIncome: number, taskExpense: number) => void;
  changeTaskState: (taskId: string, isCompleted: boolean) => void;
  setTaskMapPreviewOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ taskReducer: { selectedTask }, authenticationReducer: { role } }: AppState): LinkStateProps => {
  return { selectedTask, role };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    editTask: bindActionCreators(editTask, dispatch),
    changeTaskState: bindActionCreators(changeTaskState, dispatch),
    setTaskMapPreviewOpen: bindActionCreators(setTaskMapPreviewOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);
