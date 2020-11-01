import React, { useContext } from 'react';
import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper, StyledLabel } from '../../../../../styles/shared';
import DatePicker from 'react-datepicker';
import Button from '../../../../atoms/Button/Button';
import { Formik } from 'formik';
import { TaskDataContext } from '../../context/TaskDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';

interface DefaultValues {
  timeEstimate?: number;
  taskIncome?: number;
  taskExpense?: number;
}

interface Props {}

const SpecificInfoPage: React.FC<Props> = () => {
  const { data, setData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    timeEstimate: data.timeEstimate ? data.timeEstimate : 0,
    taskIncome: data.taskIncome ? data.taskIncome : 0,
    taskExpense: data.taskExpense ? data.taskExpense : 0
  };

  const handleSubmit = (values: DefaultValues): void => {
    console.log('add new task');
    console.log(values);
    setData({ ...data, ...values });
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

export default SpecificInfoPage;
