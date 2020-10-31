import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { ClientInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { Wrapper, StyledForm, HeaderWrapper, Paragraph, EmployeeInfoBox, SubParagraph, TextParagraph, Title, InputWrapper, ButtonWrapper, RowIconWrapper } from '../../../styles/contentStyles';
import { StyledInput } from '../../../styles/compoundStyles';
import { EditIcon, DeleteIcon } from '../../../styles/iconStyles';
import Button from '../../atoms/Button/Button';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';

interface InitialValues {
  name?: string;
  email?: string;
  lat?: number;
  long?: number;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
}

interface Props {
  isEditToggled: boolean;
  setEditToggled: (toBeOpen: boolean) => void;
  setDeleteOpen: (toBeOpen: boolean) => void;
}

type ConnectedProps = Props & LinkStateProps;

const ClientInfo: React.FC<ConnectedProps> = ({ selectedClient, isEditToggled, setEditToggled, setDeleteOpen }) => {
  const initialValues: InitialValues = {
    name: selectedClient?.name,
    email: selectedClient?.email,
    lat: selectedClient?.lat,
    long: selectedClient?.long,
    phoneNumber: selectedClient?.phoneNumber,
    address: selectedClient?.address,
    city: selectedClient?.city,
    country: selectedClient?.country
  };

  const handleSubmit = (values: InitialValues) => {
    console.log(values);
  };

  return (
    <Wrapper>
      {!!selectedClient && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values }) => (
            <StyledForm>
              <Paragraph>Data dodania: {new Date(selectedClient?.createdDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>{values.name}</Title>
                <RowIconWrapper>
                  <EditIcon onClick={() => setEditToggled(!isEditToggled)} />
                  <DeleteIcon onClick={() => setDeleteOpen(true)} />
                </RowIconWrapper>
              </HeaderWrapper>
              <EmployeeInfoBox>
                <SubParagraph>Email: {values.email}</SubParagraph>
                <SubParagraph>
                  Adres: {values.address}, {values.city}
                </SubParagraph>
              </EmployeeInfoBox>
              <TextParagraph>Jeżeli chcesz edytować dane klienta, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie wszystkich pól oraz edycję danych.</TextParagraph>
              <InputWrapper>
                <StyledInput onChange={handleChange} name={'name'} required={true} type={'text'} labelText={'Nazwa'} value={values.name} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'email'} required={true} type={'email'} labelText={'Email'} value={values.email} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'phoneNumber'} required={true} type={'text'} labelText={'Numer telefonu'} value={values.phoneNumber} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'address'} type={'text'} required={true} labelText={'Adres'} value={values.address} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'city'} type={'text'} required={true} labelText={'Miasto'} value={values.city} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'country'} type={'text'} required={true} labelText={'Państwo'} value={values.country} disabled={!isEditToggled} />
              </InputWrapper>
              <ButtonWrapper>
                <Button type={'submit'} text={'Zapisz'} />
              </ButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

interface LinkStateProps {
  selectedClient: ClientInterface | null;
}

const mapStateToProps = ({ clientReducer: { selectedClient } }: AppState): LinkStateProps => {
  return { selectedClient };
};

export default connect(mapStateToProps)(ClientInfo);
