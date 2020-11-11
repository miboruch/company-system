import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import { ButtonWrapper, Paragraph, InfoParagraph } from '../../../styles/popupStyles';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Checkbox/Checkbox';

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

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface DefaultState {
  addEmployee: boolean;
  pricePerHour: number;
  monthlyPrice: number;
}

const RemoveAdminPopup: React.FC<Props> = ({ isOpen, setOpen }) => {
  const initialValues: DefaultState = {
    addEmployee: false,
    pricePerHour: 0,
    monthlyPrice: 0
  };

  const handleSubmit = (values: DefaultState) => {
    console.log(values);
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={'Usuń administratora'}>
      <ContentWrapper>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, values, setFieldValue }) => (
            <StyledForm>
              <Paragraph>Usuwasz administratora, czy chcesz aby pozostał on w twojej firmie jako pracownik?</Paragraph>
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

export default RemoveAdminPopup;
