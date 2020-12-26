import React from 'react';
import { Formik } from 'formik';

import PopupTemplate from 'components/templates/PopupTemplate/PopupTemplate';
import Input from 'components/atoms/Input/Input';
import ModalButton, { ButtonType } from 'components/atoms/ModalButton/ModalButton';

import { addIncome, addExpense } from 'ducks/finances/income-expense/income-expense-creators';
import { ButtonWrapper, ContentWrapper } from 'styles/popupStyles';
import { StyledForm, StyledInput } from './IncomeExpensePopup.styles';
import { IncomeExpenseSchema } from 'validation/modelsValidation';
import { useAppDispatch } from 'store/store';

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
  description: string;
}

const IncomeExpensePopup: React.FC<Props> = ({ type, isOpen, setOpen }) => {
  const dispatch = useAppDispatch();
  const initialValues: DefaultValue = {
    value: 0,
    description: ''
  };

  const handleSubmit = ({ value, description }: DefaultValue) => {
    type === FinancePopupInterface.Income
      ? dispatch(addIncome({ incomeValue: value, description, callback: () => setOpen(false) }))
      : dispatch(addExpense({ expenseValue: value, description, callback: () => setOpen(false) }));
  };

  const handleClose = () => setOpen(false);

  return (
    <PopupTemplate isOpen={isOpen} headerText={`Dodaj ${type === FinancePopupInterface.Expense ? 'wydatek' : 'przychód'}`} isHigher={false}>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={IncomeExpenseSchema} validateOnBlur={false} validateOnChange={false}>
          {({ handleChange, values, errors }) => (
            <StyledForm>
              <ContentWrapper>
                <StyledInput
                  onChange={handleChange}
                  name={'value'}
                  required={true}
                  value={values.value}
                  type={'number'}
                  labelText={errors.value || type === FinancePopupInterface.Expense ? 'Wydatek' : 'Przychód'}
                />
                <Input onChange={handleChange} name={'description'} required={true} value={values.description} type={'text'} labelText={errors.description || 'Opis'} />
              </ContentWrapper>
              <ButtonWrapper>
                <ModalButton onClick={handleClose} buttonType={ButtonType.Cancel} text={'Zamknij'} />
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
