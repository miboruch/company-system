import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Formik } from 'formik';
import { StyledInput } from '../../../styles/compoundStyles';
import { Paragraph } from '../../../styles/typography/typography';
import { ButtonWrapper, EmployeeInfoBox, HeaderWrapper, InputWrapper, RowIconWrapper, StyledForm, Title, Wrapper } from '../../../styles/contentStyles';
import { ClientInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/test-store';
import { StyledLabel } from '../../../styles/shared';
import DatePicker from 'react-datepicker';
import Button from '../../atoms/Button/Button';
import { CheckedIcon, DeleteIcon, EditIcon, LocationIcon, NotCheckedIcon } from '../../../styles/iconStyles';
import { changeTaskState, editTask } from '../../../ducks/tasks/tasks-data/task-data-creators';
import { setTaskMapPreviewOpen } from '../../../ducks/tasks/tasks-toggle/tasks-toggle';
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

const TaskInfo: React.FC<Props> = ({ isEditToggled, setEditToggled, setDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { selectedTask } = useSelector((state: AppState) => state.tasks.taskToggle);

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
      dispatch(editTask({ taskId: _id, date, name, description, timeEstimate, taskIncome: taskIncome ? taskIncome : 0, taskExpense: taskExpense ? taskExpense : 0 }));
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
                  {selectedTask.clientId && <LocationIcon onClick={() => dispatch(setTaskMapPreviewOpen(true))} />}
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
                  <ColoredParagraph isCompleted={selectedTask?.isCompleted} onClick={() => dispatch(changeTaskState({ taskId: selectedTask?._id, isCompleted: !selectedTask?.isCompleted }))}>
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

export default TaskInfo;
