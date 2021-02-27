import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { FormField, Button, MultipleDropdown } from 'components';
import { AppState } from 'store/store';
import { EmployeeDataInterface } from 'types/modelsTypes';
import { TaskDataContext } from '../../context/TaskDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { TaskInfoSchema } from '../../validation/validation';

import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';
import { DoubleFlexWrapper } from 'styles/shared';

interface DefaultValues {
  name: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  selectedEmployees: string[];
}

const TaskInfo: React.FC = () => {
  const { data, setData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const { allCompanyEmployees } = useSelector((state: AppState) => state.employees.employeesData);

  const initialValues: DefaultValues = {
    name: data.name ? data.name : '',
    description: data.description ? data.description : '',
    date: data.date ? data.date : new Date(),
    isCompleted: data.isCompleted ? data.isCompleted : false,
    selectedEmployees: data.selectedEmployees ? data.selectedEmployees : []
  };

  const handleSubmit = (values: DefaultValues): void => {
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={TaskInfoSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, setFieldValue }) => {
        const handleEmployeeSelect = (selectedItems: EmployeeDataInterface[]) => {
          const temp = selectedItems.map((employee) => employee._id);
          setFieldValue('selectedEmployees', temp.length > 0 ? temp : []);
        };

        return (
          <Wrapper>
            <StyledForm>
              <HeadingWrapper>
                <MobileCompoundTitle>Główne informacje o zadaniu</MobileCompoundTitle>
                <Subheading>Wszystkie pola są wymagane</Subheading>
              </HeadingWrapper>
              <MultipleDropdown
                items={allCompanyEmployees}
                labelText={'Wybierz pracownika'}
                onSelectionItemsChange={handleEmployeeSelect}
              />
              <FormField name={'name'} type={'text'} label={'Nazwa zadania'} required={true} />
              <FormField name={'description'} type={'text'} label={'Opis zadania'} required={true} />
              <FormField name={'date'} type={'date'} label={'Data zadania'} required={true} />
              <DoubleFlexWrapper>
                <Button type={'submit'} disabled={isSubmitting}>
                  Dalej
                </Button>
              </DoubleFlexWrapper>
            </StyledForm>
          </Wrapper>
        );
      }}
    </Formik>
  );
};

export default TaskInfo;
