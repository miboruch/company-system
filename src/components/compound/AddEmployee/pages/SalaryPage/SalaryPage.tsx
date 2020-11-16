import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { sendRegistrationMail } from '../../../../../actions/authenticationActions';
import { addNewEmployee } from '../../../../../actions/employeeActions';

type DefaultValues = {
  email?: string;
  pricePerHour: number;
  monthlyPrice: number;
};

const SalaryPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, setData } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    email: data.registerWithMail ? data.email || '' : undefined,
    pricePerHour: data.pricePerHour || 0,
    monthlyPrice: data.monthlyPrice || 0
  };

  const handleSubmit = (values: DefaultValues): void => {
    setData({ ...data, ...values });
    if (data.registerWithMail) {
      if (values.email) {
        dispatch(sendRegistrationMail(values.email, values.pricePerHour, values.monthlyPrice));
      }
    } else {
      data.userId && dispatch(addNewEmployee(data.userId, values.pricePerHour, values.monthlyPrice));
    }
  };

  const handlePageBack = (): void => {
    setCurrentPage(PageSettingEnum.First);
    setData({ ...data, registerWithMail: false });
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
              <StyledBackParagraph type={'back'} onClick={() => handlePageBack()}>
                Wstecz
              </StyledBackParagraph>
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

export default SalaryPage;
