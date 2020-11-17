import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import Input from '../../atoms/Input/Input';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { addExpense, addIncome } from '../../../actions/financeActions';
import { ButtonWrapper, ContentWrapper } from '../../../styles/popupStyles';
import { StyledForm, StyledInput } from './IncomeExpensePopup.styles';
import { IncomeExpenseSchema } from '../../../validation/modelsValidation';

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

type ConnectedProps = Props & LinkDispatchProps;

const IncomeExpensePopup: React.FC<ConnectedProps> = ({ type, isOpen, setOpen, addExpense, addIncome }) => {
  const initialValues: DefaultValue = {
    value: 0,
    description: ''
  };

  const handleSubmit = ({ value, description }: DefaultValue) => {
    type === FinancePopupInterface.Income ? addIncome(value, description, () => setOpen(false)) : addExpense(value, description, () => setOpen(false));
  };

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

interface LinkDispatchProps {
  addIncome: (incomeValue: number, description: string, callback: () => void) => void;
  addExpense: (expenseValue: number, description: string, callback: () => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    addIncome: bindActionCreators(addIncome, dispatch),
    addExpense: bindActionCreators(addExpense, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(IncomeExpensePopup);
