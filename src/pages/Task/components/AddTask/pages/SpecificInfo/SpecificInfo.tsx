import React, { useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { Button, FormField, Dropdown } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { TaskDataContext } from '../../context/TaskDataContext';
import { addNewTask } from 'ducks/tasks/tasks-data/task-data-creators';
import { getCompanyClients } from 'ducks/client/client-data/client-data-creators';
import { TaskSpecificInfoSchema } from '../../validation/validation';

import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';
import { DoubleFlexWrapper } from 'styles/shared';

interface DefaultValues {
  timeEstimate: number;
  taskIncome?: number;
  taskExpense?: number;
  clientId: string | null;
}

interface Props {
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const SpecificInfo: React.FC<Props> = ({handleClose, setRefreshDate}) => {
  const dispatch = useAppDispatch();
  const { allCompanyClients } = useSelector((state: AppState) => state.client.clientData);

  const { data, setData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    timeEstimate: data.timeEstimate ? data.timeEstimate : 0,
    taskIncome: data.taskIncome ? data.taskIncome : 0,
    taskExpense: data.taskExpense ? data.taskExpense : 0,
    clientId: data.clientId ? data.clientId : null
  };

  const handleSubmit = ({ timeEstimate, taskIncome, taskExpense, clientId }: DefaultValues): void => {
    setData({ ...data, timeEstimate, taskIncome, taskExpense, clientId });

    if (data.date && data.name && data.description && data.selectedEmployees && data.isCompleted !== undefined) {
      dispatch(
        addNewTask({
          date: data.date,
          timeEstimate,
          name: data.name,
          description: data.description,
          isCompleted: data.isCompleted,
          taskIncome,
          taskExpense,
          clientId,
          employees: data.selectedEmployees
        })
      );
    }
  };

  const handlePreviousPage = () => setCurrentPage(PageSettingEnum.First);

  useEffect(() => {
    allCompanyClients.length === 0 && dispatch(getCompanyClients());
  }, []);

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={TaskSpecificInfoSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Szczegółowe informacje o zadaniu</MobileCompoundTitle>
              <Subheading>Uzupełnij informacje</Subheading>
            </HeadingWrapper>
            <Dropdown
              options={allCompanyClients}
              onChange={(selectedItem) =>
                setFieldValue('clientId', allCompanyClients.find((client) => client.name === selectedItem)?._id)
              }
              labelText={'Wybierz klienta'}
            />
            <FormField name={'timeEstimate'} type={'number'} label={'Szacowany czas *'} required={true} />
            <FormField name={'taskIncome'} type={'number'} label={'Przychód z zadania *'} required={false} />
            <FormField name={'taskExpense'} type={'number'} label={'Wydatek na zadanie *'} required={false} />
            <DoubleFlexWrapper>
              <StyledBackParagraph type={'back'} onClick={handlePreviousPage}>
                Wstecz
              </StyledBackParagraph>
              <Button type={'submit'} disabled={isSubmitting}>
                Dodaj
              </Button>
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default SpecificInfo;
