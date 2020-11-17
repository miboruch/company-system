import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import { Formik } from 'formik';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper, StyledLabel } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { TaskDataContext } from '../../context/TaskDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { TaskInfoSchema } from '../../validation/validation';

interface DefaultValues {
  name: string;
  description: string;
  date: Date;
  isCompleted: boolean;
}

interface Props {}

const TaskInfoPage: React.FC<Props> = () => {
  const { data, setData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    name: data.name ? data.name : '',
    description: data.description ? data.description : '',
    date: data.date ? data.date : new Date(),
    isCompleted: data.isCompleted ? data.isCompleted : false
  };

  const handleSubmit = (values: DefaultValues): void => {
    console.log(values);
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={TaskInfoSchema} validateOnChange={false} validateOnBlur={false}>
      {({ handleChange, values, setFieldValue, errors }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Główne informacje o zadaniu</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'name'} value={values.name} required={true} type={'text'} labelText={errors.name || 'Nazwa zadania'} />
            <StyledInput onChange={handleChange} name={'description'} value={values.description} required={true} type={'text'} labelText={errors.description || 'Opis zadania'} />
            <div>
              <StyledLabel>{errors.date || 'Data zadania'}</StyledLabel>
              <DatePicker selected={values.date} onChange={(date) => setFieldValue('date', date)} dateFormat={'dd/MM/yyyy'} />
            </div>
            <DoubleFlexWrapper>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default TaskInfoPage;
