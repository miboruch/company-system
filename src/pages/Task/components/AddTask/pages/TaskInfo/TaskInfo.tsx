import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { FormField, Button, MultipleDropdown } from 'components';
import { taskInfoValues } from './task-info.values';
import { fetchEmployees } from 'api';
import { useFetch, useShowContent } from 'components/hooks';
import { AppState } from 'store/store';
import { EmployeeModel } from 'types';
import { TaskDataContext, MainTaskInfo } from '../../context/TaskDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { TaskInfoSchema } from '../../validation/validation';

import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';
import { Paragraph, DoubleFlexWrapper } from 'styles';

const TaskInfo: React.FC = () => {
  const { mainData, setMainData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const employeesData = useFetch<typeof fetchEmployees>(fetchEmployees(role));
  const { showContent, showNoContent } = useShowContent(employeesData);
  const { payload: employees } = employeesData;

  const initialValues = taskInfoValues(mainData);

  const handleSubmit = (values: MainTaskInfo): void => {
    setMainData({ ...values });
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
        const handleEmployeeSelect = (selectedItems: EmployeeModel[]) => {
          const temp = selectedItems.map((employee) => employee._id);
          setFieldValue('employees', temp.length > 0 ? temp : []);
        };

        return (
          <Wrapper>
            <StyledForm>
              <HeadingWrapper>
                <MobileCompoundTitle>Główne informacje o zadaniu</MobileCompoundTitle>
                <Subheading>Wszystkie pola są wymagane</Subheading>
              </HeadingWrapper>
              {showContent && employees && (
                <MultipleDropdown
                  items={employees.employees}
                  labelText={'Wybierz pracownika'}
                  onSelectionItemsChange={handleEmployeeSelect}
                />
              )}
              {showNoContent && <Paragraph>Brak pracowników</Paragraph>}
              <FormField name={'name'} type={'text'} label={'Nazwa zadania'} required={true} spacing={true} />
              <FormField name={'description'} type={'text'} label={'Opis zadania'} required={true} spacing={true} />
              <FormField name={'date'} type={'date'} label={'Data zadania'} required={true} spacing={true} />
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
