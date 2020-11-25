import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import Button from '../../atoms/Button/Button';
import MapCoordsEdit, { CoordsEditType } from '../../organisms/MapCoordsEdit/MapCoordsEdit';
import { AppState } from '../../../store/test-store';
import { CompanyInterface } from '../../../types/modelsTypes';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { Heading, StyledForm } from '../AccountSettings/AccountSettings.styles';
import { StyledInput } from '../../../styles/compoundStyles';
import { editCompany } from '../../../actions/companyActions';
import { DoubleFlexWrapper, StyledLabel } from '../../../styles/shared';
import { setEditCompanyCoordsOpen } from '../../../actions/toggleActions';
import { CompanySchema } from '../../../validation/modelsValidation';

interface DefaultValues {
  name: string;
  email: string;
  nip: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

type ConnectedProps = LinkStateProps & LinkDispatchProps;

const CompanySettings: React.FC<ConnectedProps> = ({ currentCompany, editCompany, isEditCompanyCoordsOpen, setEditCompanyCoordsOpen }) => {
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>('');

  const initialValues: DefaultValues = {
    name: currentCompany!.name,
    email: currentCompany!.email,
    nip: currentCompany!.nip,
    phoneNumber: currentCompany!.phoneNumber,
    address: currentCompany!.address,
    city: currentCompany!.city,
    country: currentCompany!.country
  };

  const handleSubmit = ({ name, email, nip, phoneNumber, address, city, country }: DefaultValues) => {
    editCompany(name, email, nip, phoneNumber, address, city, country);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={CompanySchema} validateOnBlur={false} validateOnChange={false}>
        {({ handleChange, values, setFieldValue, errors }) => (
          <StyledForm>
            <Heading>Ustawienia firmy</Heading>
            <StyledInput type={'text'} name={'name'} onChange={handleChange} value={values.name} required={true} labelText={errors.name || 'Imię'} />
            <StyledInput type={'email'} name={'email'} onChange={handleChange} value={values.email} required={true} labelText={errors.email || 'Email'} />
            <StyledInput type={'text'} name={'nip'} onChange={handleChange} value={values.nip} required={true} labelText={errors.nip || 'NIP'} />
            <div>
              <StyledLabel>{errors.phoneNumber || 'Numer telefonu'}</StyledLabel>
              <NumberFormat
                onValueChange={({ formattedValue, value }) => {
                  setFieldValue('phoneNumber', value);
                  setFormattedPhoneNumber(formattedValue);
                }}
                name={'phoneNumber'}
                value={formattedPhoneNumber || values.phoneNumber}
                format={'### ### ###'}
                className={'phone-input'}
              />
            </div>
            <StyledInput type={'text'} name={'address'} onChange={handleChange} value={values.address} required={true} labelText={errors.address || 'Adres'} />
            <StyledInput type={'text'} name={'city'} onChange={handleChange} value={values.city} required={true} labelText={errors.city || 'Miasto'} />
            <StyledInput type={'text'} name={'country'} onChange={handleChange} value={values.country} required={true} labelText={errors.country || 'Kraj'} />
            <p onClick={() => setEditCompanyCoordsOpen(true)}>Edit company coords</p>
            <DoubleFlexWrapper>
              <Button type={'submit'} text={'Zapisz'} />
            </DoubleFlexWrapper>
          </StyledForm>
        )}
      </Formik>
      {currentCompany && <MapCoordsEdit isOpen={isEditCompanyCoordsOpen} setOpen={setEditCompanyCoordsOpen} lat={currentCompany.lat} long={currentCompany.long} type={CoordsEditType.Company} />}
    </>
  );
};

interface LinkStateProps {
  currentCompany: CompanyInterface | null;
  isEditCompanyCoordsOpen: boolean;
}

const mapStateToProps = ({ companyReducer: { currentCompany }, toggleReducer: { isEditCompanyCoordsOpen } }: AppState): LinkStateProps => {
  return { currentCompany, isEditCompanyCoordsOpen };
};

interface LinkDispatchProps {
  editCompany: (name: string, email: string, nip: string, phoneNumber: string, address: string, city: string, country: string) => void;
  setEditCompanyCoordsOpen: (isOpen: boolean) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    editCompany: bindActionCreators(editCompany, dispatch),
    setEditCompanyCoordsOpen: bindActionCreators(setEditCompanyCoordsOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySettings);
