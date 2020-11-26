import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { Formik } from 'formik';
import { TaskDataContext } from '../../context/TaskDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { addNewTask } from '../../../../../ducks/tasks/tasks-data/task-data-creators';
import Dropdown from '../../../../atoms/Dropdown/Dropdown';
import { getCompanyClients } from '../../../../../ducks/client/client-data/client-data-creators';
import { AppState } from '../../../../../store/test-store';
import { TaskSpecificInfoSchema } from '../../validation/validation';

interface DefaultValues {
  timeEstimate: number;
  taskIncome?: number;
  taskExpense?: number;
  clientId: string | null;
}

const SpecificInfoPage: React.FC = () => {
  const dispatch = useDispatch();
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
    if (data.date && data.name && data.description && data.isCompleted !== undefined) {
      dispatch(addNewTask({ date: data.date, timeEstimate, name: data.name, description: data.description, isCompleted: data.isCompleted, taskIncome, taskExpense, clientId }));
    }
  };

  useEffect(() => {
    allCompanyClients.length === 0 && dispatch(getCompanyClients());
  }, []);

  const handleClientSelect = (selected: string | null) => console.log(allCompanyClients.find((client) => client.name === selected));

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={TaskSpecificInfoSchema} validateOnBlur={false} validateOnChange={false}>
      {({ handleChange, values, setFieldValue, errors }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Szczegółowe informacje o zadaniu</MobileCompoundTitle>
              <Subheading>Uzupełnij informacje</Subheading>
            </HeadingWrapper>
            <Dropdown
              options={allCompanyClients}
              onChange={(selectedItem) => setFieldValue('clientId', allCompanyClients.find((client) => client.name === selectedItem)?._id)}
              labelText={'Wybierz klienta'}
            />
            <StyledInput onChange={handleChange} name={'timeEstimate'} value={values.timeEstimate} required={true} type={'number'} labelText={errors.timeEstimate || 'Szacowany czas *'} />
            <StyledInput onChange={handleChange} name={'taskIncome'} value={values.taskIncome} required={false} type={'number'} labelText={errors.taskIncome || 'Przychód z zadania *'} />
            <StyledInput onChange={handleChange} name={'taskExpense'} value={values.taskExpense} required={false} type={'number'} labelText={errors.taskExpense || 'Wydatek na zadanie *'} />
            <DoubleFlexWrapper>
              <StyledBackParagraph type={'back'} onClick={() => setCurrentPage(PageSettingEnum.First)}>
                Wstecz
              </StyledBackParagraph>
              <Button type={'submit'} text={'Dodaj'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default SpecificInfoPage;
