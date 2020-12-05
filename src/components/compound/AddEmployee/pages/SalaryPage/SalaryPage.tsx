import React, { useContext } from 'react';
import { Formik } from 'formik';
import { HeadingWrapper, MobileCompoundTitle, StyledBackParagraph, StyledForm, StyledInput, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { sendRegistrationMail } from '../../../../../ducks/auth/link-registration/link-registration-creators';
import { addNewEmployee } from '../../../../../ducks/employees/employees-data/employees-data-creators';
import { EmployeeSalarySchema } from '../../validation/validation';
import { useAppDispatch } from '../../../../../store/store';

type DefaultValues = {
  email?: string;
  pricePerHour: number;
  monthlyPrice: number;
};

const SalaryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, setData } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    email: data.registerWithMail ? data.email || '' : undefined,
    pricePerHour: data.pricePerHour || 0,
    monthlyPrice: data.monthlyPrice || 0
  };

  const handleSubmit = ({ email, pricePerHour, monthlyPrice }: DefaultValues): void => {
    setData({ ...data, email, pricePerHour, monthlyPrice });
    if (data.registerWithMail) {
      if (email) {
        dispatch(sendRegistrationMail({ email, pricePerHour, monthlyPrice }));
      }
    } else {
      data.userId && dispatch(addNewEmployee({ userId: data.userId, pricePerHour, monthlyPrice }));
    }
  };

  const handlePageBack = (): void => {
    setCurrentPage(PageSettingEnum.First);
    setData({ ...data, registerWithMail: false });
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={EmployeeSalarySchema} validateOnBlur={false} validateOnChange={false}>
      {({ handleChange, values, errors }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Informacje szczegółowe</MobileCompoundTitle>
              <Subheading>Uzupełnij informacje</Subheading>
            </HeadingWrapper>
            {data.registerWithMail && <StyledInput onChange={handleChange} name={'email'} value={values.email} type={'email'} required={true} labelText={errors.email || 'Email'} />}
            <StyledInput
              onChange={handleChange}
              name={'pricePerHour'}
              value={values.pricePerHour}
              type={'number'}
              required={false}
              labelText={errors.pricePerHour || 'Stawka godzinowa'}
              disabled={!!values.monthlyPrice}
            />
            <StyledInput
              onChange={handleChange}
              name={'monthlyPrice'}
              value={values.monthlyPrice}
              type={'number'}
              required={false}
              labelText={errors.monthlyPrice || 'Stawka miesięczna'}
              disabled={!!values.pricePerHour}
            />
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
