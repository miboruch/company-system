import React from 'react';
import { Formik } from 'formik';

import { Button, FormField, Spinner } from 'components';
import { useAppDispatch } from 'store/store';
import { useFetch, useSubmit, useShowContent } from 'components/hooks';
import { setNotification } from 'ducks/popup/popup';
import { accountInitialValues } from './account-settings.values';
import { fetchUserData, putUserData, EditAccountData } from 'api';
import { AccountSchema } from 'validation/modelsValidation';
import { accountSettingsFields } from './account-settings.fields';

import { DoubleFlexWrapper } from 'styles/shared';
import { StyledForm, Heading } from './AccountSettings.styles';
import { Paragraph } from 'styles';
import { SpinnerWrapper } from 'styles/shared';

const AccountSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  const userData = useFetch(fetchUserData);
  const { showContent, showLoader, showNoContent, showError } = useShowContent(userData);
  const { payload: user, refresh } = userData;

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit<typeof putUserData, EditAccountData>(putUserData);
  onSubmitSuccess(async () => {
    dispatch(setNotification({ message: 'Zaktualizowano' }));
    await refresh();
  });
  onSubmitError((message) => dispatch(setNotification({ message })));

  const initialValues = accountInitialValues(user);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={AccountSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          {showLoader && (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          )}
          {showNoContent && <Paragraph>Brak danych</Paragraph>}
          {showError && <Paragraph>Problem podczas ładowania danych</Paragraph>}
          {showContent && user && (
            <>
              <Heading>Ustawienia konta</Heading>
              {accountSettingsFields.map((field) => (
                <FormField key={field.name} {...field} spacing={true} />
              ))}
              <DoubleFlexWrapper style={{ marginBottom: '2rem' }}>
                <Button type={'submit'} disabled={isSubmitting}>
                  Zapisz
                </Button>
              </DoubleFlexWrapper>
            </>
          )}
        </StyledForm>
      )}
    </Formik>
  );
};

export default AccountSettings;
