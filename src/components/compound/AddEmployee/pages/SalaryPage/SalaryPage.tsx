import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { addNewTask } from '../../../../../actions/taskActions';
import { sendRegistrationMail } from '../../../../../actions/authenticationActions';

interface Props {}

type ConnectedProps = Props & LinkDispatchProps;

type DefaultValues = {
  email?: string;
  pricePerHour: number;
  monthlyPrice: number;
};

const SalaryPage: React.FC<ConnectedProps> = ({ sendRegistrationMail }) => {
  const { data, setData } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    email: data.registerWithMail ? data.email || '' : undefined,
    pricePerHour: data.pricePerHour || 0,
    monthlyPrice: data.monthlyPrice || 0
  };

  const handleSubmit = (values: DefaultValues) => {
    console.log(values);
    setData({ ...data, ...values });
    if (data.registerWithMail) {
      console.log('send request to register with mail');
      if (values.email) {
        sendRegistrationMail(values.email, values.pricePerHour, values.monthlyPrice);
      }
    } else {
      console.log('add user');
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Informacje szczegółowe</MobileCompoundTitle>
              <Subheading>Uzupełnij informacje</Subheading>
            </HeadingWrapper>
            {data.registerWithMail && <StyledInput onChange={handleChange} name={'email'} value={values.email} type={'email'} required={true} labelText={'Email'} />}
            <StyledInput onChange={handleChange} name={'pricePerHour'} value={values.pricePerHour} type={'number'} required={false} labelText={'Stawka godzinowa'} disabled={!!values.monthlyPrice} />
            <StyledInput onChange={handleChange} name={'monthlyPrice'} value={values.monthlyPrice} type={'number'} required={false} labelText={'Stawka miesięczna'} disabled={!!values.pricePerHour} />
            <DoubleFlexWrapper>
              <StyledBackParagraph onClick={() => setCurrentPage(PageSettingEnum.First)}>Wstecz</StyledBackParagraph>
              <Button
                type={'submit'}
                text={'Dodaj'}
                // disabled={data.registerWithMail ? !values.email || !(values.pricePerHour && values.monthlyPrice) : !(values.pricePerHour && values.monthlyPrice)}
              />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

interface LinkDispatchProps {
  sendRegistrationMail: (email: string, pricePerHour?: number, monthlyPrice?: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    sendRegistrationMail: bindActionCreators(sendRegistrationMail, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SalaryPage);
