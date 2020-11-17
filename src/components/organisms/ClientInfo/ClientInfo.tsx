import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { ClientInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { Paragraph } from '../../../styles/typography/typography';
import { ButtonWrapper, EmployeeInfoBox, HeaderWrapper, InputWrapper, RowIconWrapper, StyledForm, Title, Wrapper } from '../../../styles/contentStyles';
import { StyledInput } from '../../../styles/compoundStyles';
import { DeleteIcon, EditIcon, LocationIcon } from '../../../styles/iconStyles';
import Button from '../../atoms/Button/Button';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { editClient } from '../../../actions/clientActions';
import { setEditClientCoordsOpen } from '../../../actions/toggleActions';
import { ClientSchema } from '../../../validation/modelsValidation';

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

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const ClientInfo: React.FC<ConnectedProps> = ({ selectedClient, isEditToggled, setEditToggled, setDeleteOpen, editClient }) => {
  const dispatch = useDispatch();
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
      editClient(_id, name, email, phoneNumber, address, city, country);
    }
  };

  return (
    <Wrapper>
      {!!selectedClient && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={ClientSchema} validateOnChange={false} validateOnBlur={false}>
          {({ handleChange, values, errors }) => (
            <StyledForm>
              <Paragraph>Data dodania: {new Date(selectedClient?.createdDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>{values.name}</Title>
                <RowIconWrapper>
                  <LocationIcon onClick={() => dispatch(setEditClientCoordsOpen(true))} />
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
              <Paragraph type={'text'}>Jeżeli chcesz edytować dane klienta, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie wszystkich pól oraz edycję danych.</Paragraph>
              <InputWrapper>
                <StyledInput onChange={handleChange} name={'name'} required={true} type={'text'} labelText={errors.name || 'Nazwa'} value={values.name} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'email'} required={true} type={'email'} labelText={errors.email || 'Email'} value={values.email} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'phoneNumber'} required={true} type={'text'} labelText={errors.phoneNumber || 'Numer telefonu'} value={values.phoneNumber} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'address'} type={'text'} required={true} labelText={errors.address || 'Adres'} value={values.address} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'city'} type={'text'} required={true} labelText={errors.city || 'Miasto'} value={values.city} disabled={!isEditToggled} />
                <StyledInput onChange={handleChange} name={'country'} type={'text'} required={true} labelText={errors.country ||'Państwo'} value={values.country} disabled={!isEditToggled} />
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

interface LinkDispatchProps {
  editClient: (clientId: string, name: string, email: string, phoneNumber: string, address: string, city: string, country: string) => void;
  setEditClientCoordsOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ clientReducer: { selectedClient } }: AppState): LinkStateProps => {
  return { selectedClient };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    editClient: bindActionCreators(editClient, dispatch),
    setEditClientCoordsOpen: bindActionCreators(setEditClientCoordsOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfo);
