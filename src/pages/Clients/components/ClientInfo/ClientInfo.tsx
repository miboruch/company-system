import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import ClientHeader from './components/ClientHeader/ClientHeader';
import ClientMainInfo from './components/ClientMainInfo/ClientMainInfo';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';
import { Button, Spinner, notifications } from 'components';
import { prepareClientValues } from './client-info.values';
import { useFetch, useShowContent, useSubmit, useQuery } from 'components/hooks';
import { fetchClient, putClient } from 'api';
import { setEditClientCoordsOpen } from 'ducks/client/client-toggle/client-toggle';
import { AppState } from 'store/store';
import { ClientSchema } from 'validation/modelsValidation';

import { Paragraph, SpinnerWrapper } from 'styles';
import { ButtonWrapper, StyledForm, Wrapper } from 'styles/contentStyles';

interface Props {
  isEditToggled: boolean;
  setEditToggled: (toBeOpen: boolean) => void;
  setDeleteOpen: (toBeOpen: boolean) => void;
}

const ClientInfo: React.FC<Props> = ({ isEditToggled, setEditToggled, setDeleteOpen }) => {
  const dispatch = useDispatch();
  const { query } = useQuery();
  const { isEditClientCoordsOpen } = useSelector((state: AppState) => state.client.clientToggle);

  const clientData = useFetch(fetchClient(query.client), {
    dependencies: [query.client],
    conditions: !!query.client,
    onError: ({ message }) => notifications.error(message)
  });
  const { showContent, showNoContent, showLoader, showError } = useShowContent(clientData);
  const { payload: client, refresh } = clientData;

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit(putClient(query.client));
  onSubmitSuccess(async () => {
    notifications.success('Zaktualizowano');
    await refresh();
  });
  onSubmitError(({ message }) => notifications.error(message));

  const initialValues = prepareClientValues(client);

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleEditToggle = () => setEditToggled(!isEditToggled);
  const handleMapClose = () => dispatch(setEditClientCoordsOpen(false));

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
          {({ isSubmitting }) => (
            <StyledForm>
              <ClientHeader client={client} handleDeleteOpen={handleDeleteOpen} handleEditToggle={handleEditToggle} />
              <ClientMainInfo isEditToggled={isEditToggled} />
              <ButtonWrapper>
                <Button type={'submit'} disabled={isSubmitting}>
                  Zapisz
                </Button>
              </ButtonWrapper>
              {/*TODO: move to Clients.tsx*/}
              <MapCoordsEdit
                isOpen={isEditClientCoordsOpen}
                closeMap={handleMapClose}
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
