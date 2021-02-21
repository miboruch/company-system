import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import { FormField, Button } from 'components';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';

import { AppState, useAppDispatch } from 'store/store';
import { setEditCompanyCoordsOpen } from 'ducks/company/company-toggle/company-toggle';
import { editCompany } from 'ducks/company/current-company/current-company-creators';
import { CompanySchema } from 'validation/modelsValidation';
import { companySettingsFields } from './company-settings.fields';

import { Heading, StyledForm } from '../AccountSettings/AccountSettings.styles';
import { DoubleFlexWrapper, AddNewParagraph } from 'styles/shared';

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
        {({ isSubmitting }) => (
          <StyledForm>
            <Heading>Ustawienia firmy</Heading>
            {companySettingsFields.map((field) => (
              <FormField key={field.name} {...field} />
            ))}
            <AddNewParagraph style={{ marginBottom: '2rem', fontSize: '15px' }} onClick={handleCoordsEditOpen(true)}>
              Edit company coords
            </AddNewParagraph>
            <DoubleFlexWrapper>
              <Button type={'submit'} disabled={isSubmitting}>
                Zapisz
              </Button>
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
