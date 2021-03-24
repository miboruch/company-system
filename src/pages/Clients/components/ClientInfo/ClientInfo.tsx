import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import { Button, FormField, Spinner } from 'components';
import { AppState } from 'store/store';
import { setEditClientCoordsOpen } from 'ducks/client/client-toggle/client-toggle';
import { clientInfoFields } from './client-info.fields';
import { editClient } from 'ducks/client/client-creators';
import { ClientSchema } from 'validation/modelsValidation';

import { Paragraph, SpinnerWrapper } from 'styles';
import { DeleteIcon, EditIcon, LocationIcon } from 'styles/iconStyles';
import {
  ButtonWrapper,
  EmployeeInfoBox,
  HeaderWrapper,
  InputWrapper,
  RowIconWrapper,
  StyledForm,
  Title,
  Wrapper
} from 'styles/contentStyles';
import { prepareClientValues } from './client-info.values';
import { useFetch, useShowContent, useSubmit, useQuery } from 'components/hooks';
import { fetchClient, putClient, PutClientInfo } from 'api';
import { setNotification } from 'ducks/popup/popup';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';

interface InitialValues {
  name: string;
  email: string;
  lat?: number;
  long?: number;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

interface Props {
  isEditToggled: boolean;
  setEditToggled: (toBeOpen: boolean) => void;
  setDeleteOpen: (toBeOpen: boolean) => void;
}

const ClientInfo: React.FC<Props> = ({ isEditToggled, setEditToggled, setDeleteOpen }) => {
  const dispatch = useDispatch();
  const { query } = useQuery();
  const { isEditClientCoordsOpen } = useSelector((state: AppState) => state.client.clientToggle);

  const clientData = useFetch<typeof fetchClient>(fetchClient(query.client), {
    dependencies: [query.client],
    conditions: !!query.client
  });
  const { showContent, showNoContent, showLoader, showError } = useShowContent(clientData);
  const { payload: client, refresh } = clientData;

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit<typeof putClient, PutClientInfo>(putClient(query.client));
  onSubmitSuccess(async () => {
    dispatch(setNotification({ message: 'Zaktualizowano', notificationType: 'success' }));
    await refresh();
  });
  onSubmitError(({ message }) => dispatch(setNotification({ message })));

  const initialValues = prepareClientValues(client);

  const handleEditCoordsOpen = () => dispatch(setEditClientCoordsOpen(true));

  return (
    <Wrapper>
      {showLoader && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Problem z załadowaniem danych</Paragraph>}
      {showContent && client && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={ClientSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, values }) => (
            <StyledForm>
              <Paragraph>Data dodania: {new Date(client.createdDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>{values.name}</Title>
                <RowIconWrapper>
                  <LocationIcon onClick={handleEditCoordsOpen} />
                  <EditIcon onClick={() => setEditToggled(!isEditToggled)} />
                  <DeleteIcon onClick={() => setDeleteOpen(true)} />
                </RowIconWrapper>
              </HeaderWrapper>
              <EmployeeInfoBox>
                <Paragraph type={'subparagraph'}>Email: {values.email}</Paragraph>
                <Paragraph type={'subparagraph'}>
                  Adres: {values.address}, {values.city}
                </Paragraph>
              </EmployeeInfoBox>
              <Paragraph type={'text'}>
                Jeżeli chcesz edytować dane klienta, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie
                wszystkich pól oraz edycję danych.
              </Paragraph>
              <InputWrapper>
                {clientInfoFields(isEditToggled).map((field) => (
                  <FormField key={field.name} {...field} />
                ))}
              </InputWrapper>
              <ButtonWrapper>
                <Button type={'submit'} disabled={isSubmitting}>
                  Zapisz
                </Button>
              </ButtonWrapper>
              <MapCoordsEdit
                isOpen={isEditClientCoordsOpen}
                closeMap={() => dispatch(setEditClientCoordsOpen(false))}
                lat={client.lat}
                long={client.long}
                type={CoordsEditType.Client}
              />
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default ClientInfo;
