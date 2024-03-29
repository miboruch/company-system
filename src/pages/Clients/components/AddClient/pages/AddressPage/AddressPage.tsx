import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField, notifications } from 'components';
import { useSubmit } from 'components/hooks';
import { postClient, PostClientInfo } from 'api';
import { clientMainValues } from '../MainClientPage/main-client.values';
import { ClientDataContext } from '../../context/ClientDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { AddressDataSchema } from '../../validation/validation';

import { Paragraph, DoubleFlexWrapper } from 'styles';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';

interface Props {
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const AddressPage: React.FC<Props> = ({ handleClose, setRefreshDate }) => {
  const { mainData, mapData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: PostClientInfo = {
    ...clientMainValues(mainData),
    lat: mapData?.lat || 0,
    long: mapData?.long || 0,
    address: '',
    city: '',
    country: ''
  };

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit(postClient);
  onSubmitSuccess(() => {
    setRefreshDate(new Date());
    handleClose();
    notifications.success('Dodano klienta');
  });
  onSubmitError(({ message }) => notifications.error(message));

  const handlePreviousPage = () => setCurrentPage(PageSettingEnum.Second);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={AddressDataSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Informacje adresowe</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <FormField name={'address'} type={'text'} label={'Adres'} required={true} spacing={true} />
            <FormField name={'city'} type={'text'} label={'Miasto'} required={true} spacing={true} />
            <FormField name={'country'} type={'text'} label={'Państwo'} required={true} spacing={true} />
            <DoubleFlexWrapper>
              <Paragraph type={'back'} onClick={handlePreviousPage}>
                Wstecz
              </Paragraph>
              <Button type={'submit'} disabled={isSubmitting}>
                Dalej
              </Button>
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default AddressPage;
