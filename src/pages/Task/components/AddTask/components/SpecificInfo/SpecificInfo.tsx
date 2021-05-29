import React, { useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { Button, FormField, Dropdown, notifications } from 'components';
import { useAppDispatch, AppState } from 'store/store';
import { useSubmit, useFetch, useShowContent } from 'components/hooks';
import { fetchClients, postTask, PostTaskData } from 'api';
import { taskInfoValues } from '../TaskInfo/task-info.values';
import { getCompanyClients } from 'ducks/client/client-data/client-data-creators';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { TaskDataContext } from '../../context/TaskDataContext';
import { TaskSpecificInfoSchema } from '../../validation/validation';

import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';
import { Paragraph, DoubleFlexWrapper } from 'styles';

interface Props {
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const SpecificInfo: React.FC<Props> = ({ handleClose, setRefreshDate }) => {
  const dispatch = useAppDispatch();
  const { allCompanyClients } = useSelector((state: AppState) => state.client.clientData);

  const { mainData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: PostTaskData = {
    ...taskInfoValues(mainData),
    timeEstimate: 0,
    taskIncome: 0,
    taskExpense: 0,
    clientId: null
  };

  const clientsData = useFetch(fetchClients);
  const { showContent, showNoContent } = useShowContent(clientsData);
  const { payload: clients } = clientsData;

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit(postTask);
  onSubmitSuccess(() => {
    handleClose();
    setRefreshDate(new Date());
    notifications.success('Dodano zadanie');
  });
  onSubmitError(({ message }) => notifications.error(message));

  const handlePreviousPage = () => setCurrentPage(PageSettingEnum.First);

  useEffect(() => {
    allCompanyClients.length === 0 && dispatch(getCompanyClients());
  }, []);

  return (
    <Formik
      onSubmit={onSubmit}
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
            {showContent && clients && (
              <Dropdown
                options={allCompanyClients}
                onChange={(selectedItem) =>
                  setFieldValue('clientId', allCompanyClients.find((client) => client.name === selectedItem)?._id)
                }
                labelText={'Wybierz klienta'}
              />
            )}
            {showNoContent && <Paragraph>Brak klientów</Paragraph>}
            <FormField name={'timeEstimate'} type={'number'} label={'Szacowany czas *'} required={true} spacing={true} />
            <FormField name={'taskIncome'} type={'number'} label={'Przychód z zadania *'} required={false} spacing={true} />
            <FormField name={'taskExpense'} type={'number'} label={'Wydatek na zadanie *'} required={false} spacing={true} />
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
