import React from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { Button, FormField } from 'components';
import { AppState } from 'store/store';
import { useAppDispatch } from 'store/store';
import { editAccount } from 'ducks/auth/account/account-creators';
import { AccountSchema } from 'validation/modelsValidation';
import { accountSettingsFields } from './account-settings.fields';

import { DoubleFlexWrapper } from 'styles/shared';
import { StyledForm, Heading } from './AccountSettings.styles';

interface DefaultValues {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

const AccountSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: AppState) => state.auth.data);

  const initialValues: DefaultValues = {
    email: userData?.email || '',
    name: userData?.name || '',
    lastName: userData?.lastName || '',
    dateOfBirth: new Date(userData?.dateOfBirth || ''),
    phoneNumber: userData?.phoneNumber || '',
    address: userData?.address || '',
    city: userData?.city || '',
    country: userData?.country || ''
  };

  const handleSubmit = ({ email, name, lastName, dateOfBirth, phoneNumber, address, city, country }: DefaultValues) => {
    dispatch(editAccount({ email, name, lastName, dateOfBirth, phoneNumber, address, city, country }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validationSchema={AccountSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Heading>Ustawienia konta</Heading>
          {accountSettingsFields.map((field) => (
            <FormField key={field.name} {...field} spacing={true} />
          ))}
          <DoubleFlexWrapper style={{ marginBottom: '2rem' }}>
            <Button type={'submit'} disabled={isSubmitting}>
              Zapisz
            </Button>
          </DoubleFlexWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default AccountSettings;
