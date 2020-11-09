import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Heading, StyledForm } from '../AccountSettings/AccountSettings.styles';
import { StyledInput } from '../../../styles/compoundStyles';
import { DoubleFlexWrapper, StyledLabel } from '../../../styles/shared';
import NumberFormat from 'react-number-format';
import Button from '../../atoms/Button/Button';
import { Formik } from 'formik';
import { CompanyInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { editCompany } from '../../../actions/companyActions';

interface DefaultValues {
  name: string;
  email: string;
  nip: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const CompanySettings: React.FC<ConnectedProps> = ({ currentCompany, editCompany }) => {
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
      {({ handleChange, handleBlur, values, setFieldValue }) => (
        <StyledForm>
          <Heading>Ustawienia firmy</Heading>
          <StyledInput type={'text'} name={'name'} onChange={handleChange} value={values.name} required={true} labelText={'Imię'} />
          <StyledInput type={'email'} name={'email'} onChange={handleChange} value={values.email} required={true} labelText={'Email'} />
          <StyledInput type={'text'} name={'nip'} onChange={handleChange} value={values.nip} required={true} labelText={'NIP'} />
          <div>
            <StyledLabel>Numer telefonu</StyledLabel>
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
          <StyledInput type={'text'} name={'address'} onChange={handleChange} value={values.address} required={true} labelText={'Adres'} />
          <StyledInput type={'text'} name={'city'} onChange={handleChange} value={values.city} required={true} labelText={'Miasto'} />
          <StyledInput type={'text'} name={'country'} onChange={handleChange} value={values.country} required={true} labelText={'Kraj'} />
          <DoubleFlexWrapper>
            <Button type={'submit'} text={'Zapisz'} />
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

interface LinkStateProps {
  currentCompany: CompanyInterface | null;
}

const mapStateToProps = ({ companyReducer: { currentCompany } }: AppState): LinkStateProps => {
  return { currentCompany };
};

interface LinkDispatchProps {
  editCompany: (name: string, email: string, nip: string, phoneNumber: string, address: string, city: string, country: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    editCompany: bindActionCreators(editCompany, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySettings);
