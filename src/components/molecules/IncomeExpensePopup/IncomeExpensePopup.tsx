import React from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { ButtonWrapper, ContentWrapper } from '../../../styles/popupStyles';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { addExpense, addIncome } from '../../../actions/financeActions';

const StyledForm = styled(Form)`
  width: 100%;
  min-height: calc(400px - 80px);
`;

const StyledInput = styled(Input)`
  margin-bottom: 3rem;
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values, setFieldValue }) => (
            <StyledForm>
              <ContentWrapper>
                <StyledInput onChange={handleChange} name={'value'} required={true} value={values.value} type={'number'} labelText={type === FinancePopupInterface.Expense ? 'Wydatek' : 'Przychód'} />
                <Input onChange={handleChange} name={'description'} required={true} value={values.description} type={'text'} labelText={'Opis'} />
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
