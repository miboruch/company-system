import React, { useContext } from 'react';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { postCompany, PostCompanyData } from 'api';
import { mainCompanyValues } from '../MainCompanyInfo/main-company.values';
import { setNotification } from 'ducks/popup/popup';
import { useSubmit } from 'components/hooks';
import { useAppDispatch } from 'store/store';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { AddressDataSchema } from '../../validation/validation';

import { DoubleFlexWrapper } from 'styles';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper, StyledBackParagraph } from 'styles/compoundStyles';

interface Props {
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const AddressInfo: React.FC<Props> = ({ handleClose, setRefreshDate }) => {
  const dispatch = useAppDispatch();
  const { mainData, mapData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: PostCompanyData = {
    ...mainCompanyValues(mainData),
    lat: mapData?.lat || 0,
    long: mapData?.long || 0,
    address: '',
    city: '',
    country: ''
  };

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit<typeof postCompany, PostCompanyData>(postCompany);
  onSubmitSuccess(() => {
    setRefreshDate(new Date());
    handleClose();
    dispatch(setNotification({ message: 'Dodano nową firmę', notificationType: 'success' }));
  });
  onSubmitError((message) => dispatch(setNotification({ message })));

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
              <MobileCompoundTitle>Główne informacje o twojej firmie</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <FormField name={'address'} type={'text'} label={'Adres'} required={true} spacing={true} />
            <FormField name={'city'} type={'text'} label={'Miasto'} required={true} spacing={true} />
            <FormField name={'country'} type={'text'} label={'Państwo'} required={true} spacing={true} />

            <DoubleFlexWrapper>
              <StyledBackParagraph type={'back'} onClick={handlePreviousPage}>
                Wstecz
              </StyledBackParagraph>
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

export default AddressInfo;
