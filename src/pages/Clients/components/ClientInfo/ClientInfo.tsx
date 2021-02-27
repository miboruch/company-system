import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { AppState } from 'store/store';
import { setEditClientCoordsOpen } from 'ducks/client/client-toggle/client-toggle';
import { clientInfoFields } from './client-info.fields';
import { editClient } from 'ducks/client/client-creators';
import { ClientSchema } from 'validation/modelsValidation';

import { Paragraph } from 'styles';
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
  const { selectedClient } = useSelector((state: AppState) => state.client.clientToggle);

  const initialValues: InitialValues = {
    name: selectedClient?.name || '',
    email: selectedClient?.email || '',
    lat: selectedClient?.lat,
    long: selectedClient?.long,
    phoneNumber: selectedClient?.phoneNumber || '',
    address: selectedClient?.address || '',
    city: selectedClient?.city || '',
    country: selectedClient?.country || ''
  };

  const handleSubmit = ({ name, email, phoneNumber, address, city, country }: InitialValues) => {
    if (selectedClient) {
      const { _id } = selectedClient;
      dispatch(editClient({ clientId: _id, name, email, phoneNumber, address, city, country }));
    }
  };

  const handleEditCoordsOpen = () => dispatch(setEditClientCoordsOpen(true));

  return (
    <Wrapper>
      {!!selectedClient && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={ClientSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, values }) => (
            <StyledForm>
              <Paragraph>Data dodania: {new Date(selectedClient?.createdDate).toLocaleDateString()}</Paragraph>
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
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default ClientInfo;
