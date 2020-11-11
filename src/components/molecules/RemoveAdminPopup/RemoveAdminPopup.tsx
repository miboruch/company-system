import React from 'react';
import { Formik, Form } from 'formik';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import { ButtonWrapper } from '../../../styles/popupStyles';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import { StyledFlexWrapper } from '../AttendancePopup/AttendancePopup.styles';

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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, values, setFieldValue }) => (
          <Form>
            <p>Usuwasz administratora, czy chcesz aby pozostał on w twojej firmie jako pracownik? Jeżeli tak - uzupełnij dane</p>
            <Checkbox onChange={() => setFieldValue('addEmployee', true)} name={'addEmployee'} labelText={'TAK'} checked={values.addEmployee} />
            <Checkbox onChange={() => setFieldValue('addEmployee', false)} name={'addEmployee'} labelText={'NIE'} checked={!values.addEmployee} />
            <Input onChange={handleChange} name={'pricePerHour'} required={false} type={'number'} labelText={'Stawka godzinowa'} disabled={values.addEmployee && !!values.monthlyPrice} />
            <Input onChange={handleChange} name={'monthlyPrice'} required={false} type={'number'} labelText={'Stawka miesięczna'} disabled={values.addEmployee && !!values.pricePerHour} />
            <ButtonWrapper>
              <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Cancel} text={'Zamknij'} />
              <ModalButton submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </PopupTemplate>
  );
};

export default RemoveAdminPopup;
