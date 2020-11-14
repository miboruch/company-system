import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import { TextParagraph, InfoParagraph } from '../../../styles/typography/typography';
import { ButtonWrapper } from '../../../styles/popupStyles';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import { CompanyOwnersInterface } from '../../../types/modelsTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { removeCompanyOwner } from '../../../actions/companyActions';

const ContentWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const StyledForm = styled(Form)`
  padding: 3rem;
`;

const StyledButtonWrapper = styled(ButtonWrapper)`
  padding-top: 0.5rem;
`;

const StyledInput = styled(Input)`
  padding: 0 1rem;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 4rem;
`;

const InputRowWrapper = styled(RowWrapper)`
  margin-bottom: 1rem;
`;

const StyledInfoParagraph = styled(InfoParagraph)`
  margin-top: 2rem;
`;

interface DefaultState {
  addEmployee: boolean;
  pricePerHour: number;
  monthlyPrice: number;
}

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  companyOwnerToDelete: CompanyOwnersInterface | null;
  callback: () => void;
}

type ConnectedProps = Props & LinkDispatchProps;

const RemoveAdminPopup: React.FC<ConnectedProps> = ({ isOpen, setOpen, companyOwnerToDelete, removeCompanyOwner, callback }) => {
  const initialValues: DefaultState = {
    addEmployee: false,
    pricePerHour: 0,
    monthlyPrice: 0
  };

  const handleSubmit = ({ addEmployee, pricePerHour, monthlyPrice }: DefaultState) => {
    companyOwnerToDelete && removeCompanyOwner(companyOwnerToDelete._id, addEmployee, callback, pricePerHour, monthlyPrice);
    //TODO: deleteOwner(companyOwnerToDelete._id, addEmployee, pricePerHour, monthlyPrice);
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={'Usuń administratora'}>
      <ContentWrapper>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, values, setFieldValue }) => (
            <StyledForm>
              <TextParagraph>Usuwasz administratora, czy chcesz aby pozostał on w twojej firmie jako pracownik?</TextParagraph>
              <StyledInfoParagraph>Jeżeli tak - uzupełnij dane</StyledInfoParagraph>
              <RowWrapper>
                <Checkbox onChange={() => setFieldValue('addEmployee', true)} name={'addEmployee'} labelText={'TAK'} checked={values.addEmployee} />
                <Checkbox onChange={() => setFieldValue('addEmployee', false)} name={'addEmployee'} labelText={'NIE'} checked={!values.addEmployee} />
              </RowWrapper>
              <InputRowWrapper>
                <StyledInput onChange={handleChange} name={'pricePerHour'} required={false} type={'number'} labelText={'Stawka godzinowa'} disabled={!values.addEmployee || !!values.monthlyPrice} />
                <StyledInput onChange={handleChange} name={'monthlyPrice'} required={false} type={'number'} labelText={'Stawka miesięczna'} disabled={!values.addEmployee || !!values.pricePerHour} />
              </InputRowWrapper>
              <StyledButtonWrapper>
                <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Cancel} text={'Zamknij'} />
                <ModalButton submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
              </StyledButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      </ContentWrapper>
    </PopupTemplate>
  );
};

interface LinkDispatchProps {
  removeCompanyOwner: (userId: string, addEmployee: boolean, callback: () => void, pricePerHour?: number, monthlyPrice?: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    removeCompanyOwner: bindActionCreators(removeCompanyOwner, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(RemoveAdminPopup);
