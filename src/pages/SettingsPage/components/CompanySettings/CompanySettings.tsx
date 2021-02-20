import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import Button from 'components/atoms/Button/Button';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';

import { AppState, useAppDispatch } from 'store/store';
import { setEditCompanyCoordsOpen } from 'ducks/company/company-toggle/company-toggle';
import { Heading, StyledForm } from '../AccountSettings/AccountSettings.styles';
import { StyledInput } from 'styles/compoundStyles';
import { editCompany } from 'ducks/company/current-company/current-company-creators';
import { DoubleFlexWrapper, StyledLabel, AddNewParagraph } from 'styles/shared';
import { CompanySchema } from 'validation/modelsValidation';

interface DefaultValues {
  name: string;
  email: string;
  nip: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

const CompanySettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isEditCompanyCoordsOpen } = useSelector((state: AppState) => state.company.companyToggle);
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);
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
    dispatch(editCompany({ name, email, nip, phoneNumber, address, city, country }));
  };

  const handleCoordsEditOpen = (isOpen: boolean) => () => setEditCompanyCoordsOpen(isOpen);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={CompanySchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleChange, values, setFieldValue, errors }) => (
          <StyledForm>
            <Heading>Ustawienia firmy</Heading>
            <StyledInput
              type={'text'}
              name={'name'}
              onChange={handleChange}
              value={values.name}
              required={true}
              labelText={errors.name || 'Imię'}
            />
            <StyledInput
              type={'email'}
              name={'email'}
              onChange={handleChange}
              value={values.email}
              required={true}
              labelText={errors.email || 'Email'}
            />
            <StyledInput
              type={'text'}
              name={'nip'}
              onChange={handleChange}
              value={values.nip}
              required={true}
              labelText={errors.nip || 'NIP'}
            />
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
            <StyledInput
              type={'text'}
              name={'address'}
              onChange={handleChange}
              value={values.address}
              required={true}
              labelText={errors.address || 'Adres'}
            />
            <StyledInput
              type={'text'}
              name={'city'}
              onChange={handleChange}
              value={values.city}
              required={true}
              labelText={errors.city || 'Miasto'}
            />
            <StyledInput
              type={'text'}
              name={'country'}
              onChange={handleChange}
              value={values.country}
              required={true}
              labelText={errors.country || 'Kraj'}
            />
            <AddNewParagraph style={{ marginBottom: '2rem', fontSize: '15px' }} onClick={handleCoordsEditOpen(true)}>
              Edit company coords
            </AddNewParagraph>
            <DoubleFlexWrapper>
              <Button type={'submit'} text={'Zapisz'} />
            </DoubleFlexWrapper>
          </StyledForm>
        )}
      </Formik>
      {currentCompany && (
        <MapCoordsEdit
          isOpen={isEditCompanyCoordsOpen}
          closeMap={handleCoordsEditOpen(false)}
          lat={currentCompany.lat}
          long={currentCompany.long}
          type={CoordsEditType.Company}
        />
      )}
    </>
  );
};

export default CompanySettings;
