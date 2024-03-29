import React from 'react';
import { Formik } from 'formik';

import { Checkbox, FormField, PopupTemplate, ModalButton } from 'components';
import { ButtonType, CompanyOwnersModel } from 'types';
import { useAppDispatch } from 'store/store';
import { removeCompanyOwner } from 'ducks/company/company-owners/company-owners-creators';

import { Paragraph } from 'styles';
import {
  ContentWrapper,
  StyledForm,
  StyledButtonWrapper,
  StyledInput,
  RowWrapper,
  InputRowWrapper,
  StyledInfoParagraph
} from './RemoveAdminPopup.styles';

interface DefaultState {
  addEmployee: boolean;
  pricePerHour: number;
  monthlyPrice: number;
}

interface Props {
  isOpen: boolean;
  closePopup: () => void;
  companyOwnerToDelete: CompanyOwnersModel | null;
}

const RemoveAdminPopup: React.FC<Props> = ({ isOpen, closePopup, companyOwnerToDelete }) => {
  const dispatch = useAppDispatch();
  const initialValues: DefaultState = {
    addEmployee: false,
    pricePerHour: 0,
    monthlyPrice: 0
  };

  const handleSubmit = ({ addEmployee, pricePerHour, monthlyPrice }: DefaultState) => {
    companyOwnerToDelete &&
      dispatch(removeCompanyOwner({ userId: companyOwnerToDelete._id, addEmployee, pricePerHour, monthlyPrice }));
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={'Usuń administratora'}>
      <ContentWrapper>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, values, setFieldValue }) => (
            <StyledForm>
              <Paragraph type={'text'}>
                Usuwasz administratora, czy chcesz aby pozostał on w twojej firmie jako pracownik?
              </Paragraph>
              <StyledInfoParagraph type={'info'}>Jeżeli tak - uzupełnij dane</StyledInfoParagraph>
              <RowWrapper>
                <FormField type={'checkbox'} label={'TAK'} name={'addEmployee'} />
                <FormField type={'checkbox'} label={'NIE'} name={'addEmployee'} />
                {/*<Checkbox*/}
                {/*  onChange={() => setFieldValue('addEmployee', true)}*/}
                {/*  name={'addEmployee'}*/}
                {/*  labelText={'TAK'}*/}
                {/*  checked={values.addEmployee}*/}
                {/*/>*/}
                {/*<Checkbox*/}
                {/*  onChange={() => setFieldValue('addEmployee', false)}*/}
                {/*  name={'addEmployee'}*/}
                {/*  labelText={'NIE'}*/}
                {/*  checked={!values.addEmployee}*/}
                {/*/>*/}
              </RowWrapper>
              <InputRowWrapper>
                <StyledInput
                  onChange={handleChange}
                  name={'pricePerHour'}
                  required={false}
                  type={'number'}
                  labelText={'Stawka godzinowa'}
                  disabled={!values.addEmployee || !!values.monthlyPrice}
                />
                <StyledInput
                  onChange={handleChange}
                  name={'monthlyPrice'}
                  required={false}
                  type={'number'}
                  labelText={'Stawka miesięczna'}
                  disabled={!values.addEmployee || !!values.pricePerHour}
                />
              </InputRowWrapper>
              <StyledButtonWrapper>
                <ModalButton onClick={closePopup} buttonType={ButtonType.Cancel} text={'Zamknij'} />
                <ModalButton submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
              </StyledButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      </ContentWrapper>
    </PopupTemplate>
  );
};

export default RemoveAdminPopup;
