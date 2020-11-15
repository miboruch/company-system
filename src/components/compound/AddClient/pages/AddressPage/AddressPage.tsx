import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { Paragraph } from '../../../../../styles/typography/typography';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { ClientDataContext } from '../../context/ClientDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { addNewClient } from '../../../../../actions/clientActions';

type defaultValues = {
  address: string;
  city: string;
  country: string;
};

type ConnectedProps = LinkDispatchProps;

const AddressPage: React.FC<ConnectedProps> = ({ addNewClient }) => {
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    address: data?.address || '',
    city: data?.city || '',
    country: data?.country || ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    if (data.name && data.email && data.phoneNumber && data.lat && data.long) {
      addNewClient(data.name, values.address, data.email, data.phoneNumber, values.city, values.country, data.lat, data.long);
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Informacje adresowe</MobileCompoundTitle>
              <Subheading>Wszystkie pola są wymagane</Subheading>
            </HeadingWrapper>
            <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={'Adres'} />
            <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={'Miasto'} />
            <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={'Kraj'} />
            <DoubleFlexWrapper>
              <Paragraph type={'back'} onClick={() => setCurrentPage(PageSettingEnum.Second)}>
                Wstecz
              </Paragraph>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

interface LinkDispatchProps {
  addNewClient: (name: string, address: string, email: string, phoneNumber: string, city: string, country: string, lat: number, long: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    addNewClient: bindActionCreators(addNewClient, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(AddressPage);
