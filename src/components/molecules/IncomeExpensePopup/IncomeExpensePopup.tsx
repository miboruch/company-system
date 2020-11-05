import React from 'react';
import { Form, Formik } from 'formik';
import { ButtonWrapper, ContentWrapper, InfoParagraph } from '../../../styles/popupStyles';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';

const StyledForm = styled(Form)`
  width: 100%;
  min-height: calc(400px - 80px);
`;

export enum FinancePopupInterface {
  Income = 'income',
  Expense = 'expense'
}

interface Props {
  type: FinancePopupInterface;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface DefaultValue {
  value: number;
}

const IncomeExpensePopup: React.FC<Props> = ({ type, isOpen, setOpen }) => {
  const initialValues: DefaultValue = {
    value: 0
  };

  const handleSubmit = ({ value }: DefaultValue) => {
    console.log(value);
  };

  return (
    <PopupTemplate isOpen={true} headerText={`Dodaj ${type === FinancePopupInterface.Expense ? 'wydatek' : 'przychód'}`} isHigher={false}>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values, setFieldValue }) => (
            <StyledForm>
              <ContentWrapper>
                <Input onChange={handleChange} name={'value'} required={true} type={'number'} labelText={type === FinancePopupInterface.Expense ? 'Wydatek' : 'Przychód'} />
              </ContentWrapper>
              <ButtonWrapper>
                <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Cancel} text={'Zamknij'} />
                <ModalButton submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
              </ButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      </div>
    </PopupTemplate>
  );
};

export default IncomeExpensePopup;
