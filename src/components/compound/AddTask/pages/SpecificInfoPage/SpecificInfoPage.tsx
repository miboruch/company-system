import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { Formik } from 'formik';
import { TaskDataContext } from '../../context/TaskDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { addNewTask } from '../../../../../actions/taskActions';

interface DefaultValues {
  timeEstimate: number;
  taskIncome?: number;
  taskExpense?: number;
}

interface Props {}

type ConnectedProps = Props & LinkDispatchProps;

const SpecificInfoPage: React.FC<ConnectedProps> = ({ addNewTask }) => {
  const { data, setData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    timeEstimate: data.timeEstimate ? data.timeEstimate : 0,
    taskIncome: data.taskIncome ? data.taskIncome : 0,
    taskExpense: data.taskExpense ? data.taskExpense : 0
  };

  const handleSubmit = (values: DefaultValues): void => {
    setData({ ...data, ...values });
    if (data.date && data.name && data.description && data.isCompleted !== undefined) {
      addNewTask(data.date, values.timeEstimate, data.name, data.description, data.isCompleted, values.taskIncome, values.taskExpense);
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Szczegółowe informacje o zadaniu</MobileCompoundTitle>
              <Subheading>Uzupełnij informacje</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'timeEstimate'} value={values.timeEstimate} required={true} type={'number'} labelText={'Szacowany czas'} />
            <StyledInput onChange={handleChange} name={'taskIncome'} value={values.taskIncome} required={false} type={'number'} labelText={'Przychód z zadania'} />
            <StyledInput onChange={handleChange} name={'taskExpense'} value={values.taskExpense} required={false} type={'number'} labelText={'Wydatek na zadanie'} />
            <DoubleFlexWrapper>
              <StyledBackParagraph onClick={() => setCurrentPage(PageSettingEnum.First)}>Wstecz</StyledBackParagraph>
              <Button type={'submit'} text={'Dodaj'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

interface LinkDispatchProps {
  addNewTask: (date: Date, timeEstimate: number, name: string, description: string, isCompleted: boolean, taskIncome?: number, taskExpense?: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    addNewTask: bindActionCreators(addNewTask, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SpecificInfoPage);
